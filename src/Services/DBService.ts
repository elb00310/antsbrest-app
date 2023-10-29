import {User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { Observer } from "./Observer";
import { Firestore, getFirestore } from "firebase/firestore";
import { DocumentData, collection,doc,getDoc,getDocs,setDoc } from "firebase/firestore"; 
import {getDownloadURL, getStorage, ref} from "firebase/storage"
import {TGood} from "../Types"

export class DBService extends Observer{
    private db: Firestore = getFirestore(this.DBFirestore);

    dataUser: DocumentData | null = null;

    constructor(private DBFirestore: FirebaseApp){
        super();
    }
    
    async getDataUser(user: User|null):Promise<void>{
        if (user === null) return;

        const docRef = doc(this.db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            this.dataUser=docSnap.data();
        } else {
            const data = {
                email: user.email,
                name:user.displayName,
                fotoUrl:user.photoURL
            };
            await setDoc(doc(this.db, "users",user.uid),data);
            const docSetSnap = await getDoc(docRef);
            this.dataUser = docSetSnap.data() || null;

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

}