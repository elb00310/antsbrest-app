import {User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { Observer } from "./Observer";
import { Firestore, getFirestore } from "firebase/firestore";
import { collection,doc,getDoc,getDocs,setDoc } from "firebase/firestore"; 
import {getDownloadURL, getStorage, ref} from "firebase/storage"
import {TDataUser, TGood, TGoodBasket} from "../Types"

export class DBService extends Observer{
    private db: Firestore = getFirestore(this.DBFirestore);

    dataUser: TDataUser | null = null;

    constructor(private DBFirestore: FirebaseApp){
        super();
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

    async getAllGoods(): Promise<TGood[]> {
        const querySnapshot = await getDocs(collection(this.db,"goods"));
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
            this.dispatch('goodInBasket',goodBasket);
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
            this.dispatch("delGoodFromBasket",good.good.id);
        })
        .catch(()=>{ })
    }
}