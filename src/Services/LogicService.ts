import {GoogleAuthProvider, User, getAuth, signInWithPopup,signOut } from "firebase/auth";
import { Observer } from "./Observer";

export class LogicService extends Observer{
    user: User | null = null;
    emailAdmin: string | null = null;
    
    authWithGoogle(): void{
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then(() =>{this.dispatch('userAuth',true);
            window.location.reload();
        })
        .catch(() =>{
            console.log('bad'); 
        });
    }
    outFromGoogle(): void{
        const auth=getAuth();
        signOut(auth)
            .then(()=> {
                this.dispatch('userAuth',false);
                window.location.reload();
            })
            .catch((error)=>{
                console.log('out bad'); 
            });
    }

}