import {User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { Observer } from "./Observer";
import { Firestore, getFirestore, orderBy, query, limit, where, Timestamp, Transaction, runTransaction } from "firebase/firestore";
import { collection,doc,getDoc,getDocs,setDoc,addDoc } from "firebase/firestore"; 
import {getDownloadURL, getStorage, ref} from "firebase/storage"
import {TCriteria, TDataUser, TGood, TGoodBasket, TDataBasket, dataHistory} from "../Types"


export class DBService extends Observer{
    private db: Firestore = getFirestore(this.DBFirestore);

    dataUser: TDataUser | null = null;
    dataBasket:TDataBasket = {
        summa:0,
        percent:0,
        allSumma:0,
        count:0
    };

    constructor(private DBFirestore: FirebaseApp){
        super();
    }

    calcCostGood(count:number,price:number):number{
        const cost = count * price;
        return cost;
    }
    
    calcDataBasket(){
        if(!this.dataUser) return;
        let summa = 0;
        let count = 0;
        this.dataUser.basket.forEach((el => {
            summa += el.count*el.good.price;
            count += el.count;
        }))
        const percent = count >= 4 ? 15 : count >=2 ? 10 : 0;
        const allSumma = summa - summa*percent/100;
        
        this.dataBasket.summa = summa;
        this.dataBasket.percent = percent;
        this.dataBasket.allSumma = allSumma;
        this.dataBasket.count = count;
    }




    async getDataUser(user: User|null):Promise<void>{
        if (user === null) return;

        const docRef = doc(this.db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            this.dataUser=docSnap.data() as TDataUser;
        } else {
            const data = {
                email: user.email,
                name:user.displayName,
                fotoUrl:user.photoURL,
                basket:[]
            };
            await setDoc(doc(this.db, "users",user.uid),data);
            const docSetSnap = await getDoc(docRef);
            this.dataUser = docSetSnap.data() as TDataUser || null;

        }
    }

    async getAllGoods(criteria:TCriteria): Promise<TGood[]> {
        const crit = [];
        if(criteria.category != "vsekat") crit.push(where("category","==",criteria.category));

        if(criteria.sort == "cena" && criteria.sortnastr=="up")  crit.push (orderBy("price","asc"));
        if(criteria.sort == "cena" && criteria.sortnastr=="down")  crit.push (orderBy("price","desc"));

        if(criteria.sort == "name" && criteria.sortnastr=="up")  crit.push (orderBy("name","asc"));
        if(criteria.sort == "name" && criteria.sortnastr=="down")  crit.push (orderBy("name","desc"));


        const q = query(collection(this.db,"goods"), ...crit);
        const querySnapshot = await getDocs(q);
        const storage = getStorage();
        const goods = querySnapshot.docs.map(async(doc)=>{
            const data=doc.data();
            const uri = ref(storage,data.url);
            const url = await getDownloadURL(uri);
            const good = {
                name:data.name as string,
                category:data.category as string,
                price:data.price as number,
                text_price:data.text_price as string,
                url:url,
                id:doc.id
            };
            return good;
        });
        return Promise.all(goods);
    }
    async addGoodInBasket (user: User | null, good:TGood ): Promise<void>{
        if (!user || !this.dataUser) return;

        const index = this.dataUser.basket.findIndex(el => el.good.id === good.id);
        if (index >=0) return;


        const newUser = {} as TDataUser;
        Object.assign(newUser,this.dataUser);
        
        const goodBasket = {
            good:good,
            count:1
        } as TGoodBasket;

        newUser.basket.push(goodBasket);

        await setDoc(doc(this.db,"users",user.uid),newUser)
        .then(()=>{
            this.dataUser = newUser;
            this.calcDataBasket();
            this.dispatch('goodInBasket',goodBasket);
            this.dispatch('changeDataBasket',this.dataBasket);
        })
        .catch(()=>{ })
    }

    async changeGoodInBasket (user: User | null, goodBasket:TGoodBasket ): Promise<void>{
        if (!user || !this.dataUser) return;

        const index = this.dataUser.basket.findIndex(el => el.good.id === goodBasket.good.id);
    
        const newUser = {} as TDataUser;
        Object.assign(newUser,this.dataUser);
        newUser.basket[index] = goodBasket;

        await setDoc(doc(this.db,"users",user.uid),newUser)
        .then(()=>{
            this.dataUser = newUser;
            this.calcDataBasket();
            this.dispatch('changeDataBasket',this.dataBasket);
        })
        .catch(()=>{ })
    }


    async delGoodFromBasket (user: User | null, good:TGoodBasket ): Promise<void>{
        if (!user || !this.dataUser) return;

        const newBasket = this.dataUser.basket.filter(
            (el) => el.good.id !== good.good.id
            );
            
        const newUser = {} as TDataUser;
        Object.assign(newUser,this.dataUser);
        newUser.basket=newBasket;

        await setDoc(doc(this.db,"users",user.uid),newUser)
        .then(()=>{
            this.dataUser = newUser;
            this.calcDataBasket();
            this.dispatch("delGoodFromBasket",good.good.id);
            this.dispatch('changeDataBasket',this.dataBasket);
        })
        .catch(()=>{ })
    }
    async addBasketInHistory (user: User | null ): Promise<void>{
        if (!user || !this.dataUser) return;

        // const index = this.dataUser.basket.findIndex(el => el.good.id === goodBasket.good.id);
    
        const newUser = {} as TDataUser;
        Object.assign(newUser,this.dataUser);
        newUser.basket = [];

        const dataHistory = {
            basket: this.dataUser.basket,
            dataBasket: this.dataBasket,
            data: Timestamp.now()
        };

        try{
            await runTransaction(this.db,async(transaction) =>{
                if (!this.dataUser) throw "БД отсутствует";
               const result = this.dataUser.basket.map(async (el) =>{
                    const goodRef = doc(this.db,"goods",el.good.id);
                    const sfGood = await transaction.get(goodRef);

                    if(!sfGood.exists()) throw "Good does not exist";
                });
                const userRef = doc(this.db, "users", user.uid)
                transaction.update(userRef,{basket:[]});
            });
            await addDoc(collection(this.db,"users",user.uid, 'history'),dataHistory);
            
            this.dataUser.basket.forEach((el)=>{
                this.dispatch("delGoodFromBasket",el.good.id);
            })
            this.dispatch('addInHistory',dataHistory);
            this.dataUser = newUser;
            this.calcDataBasket();
            this.dispatch('clearBasket');
            this.dispatch('changeDataBasket',this.dataBasket);
            this.calcCountDocsHistory(user);
            alert("Спасибо! Ваш заказ оформлен!");
            
            console.log("transaction committed");
            } catch (e) {
                console.log("transaction failed ",e);
            }
        }
        async calcCountDocsHistory(user:User | null): Promise<void>{
            if (!user || !this.dataUser) return;

            const querySnapshot = await getDocs(collection(this.db,"users",user.uid,"history"));
            const count = querySnapshot.docs.length;
            
            let summa =0;
            querySnapshot.docs.forEach(el =>{
                summa += el.data().dataBasket.allSumma;
            })

            this.dispatch('changeStat',count,summa);
        }
        async getAllHistory(user: User|null): Promise<dataHistory[]> {  
            if (!user || !this.dataUser) return [];
            const querySnapshot = await getDocs(collection(this.db,"users",user.uid,'history'));
            const rez = querySnapshot.docs.map((doc)=>{
                const data=doc.data() as dataHistory;
                return data;
            });
            return rez;
        }
    }