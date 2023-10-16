import { Component } from "../Abstract/Component";
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
export class Reg extends Component{
    regButton:Component;
    constructor(parrent:HTMLElement){
        super(parrent, 'div', ['reg']);
        new Component(this.root,'p',['title_reg'],'Регистрация');
        new Component(this.root, 'img', ["dogpict"],null,['src','alt'],['./assets/png/dogreg.png','icon'] );
        this.regButton = new Component(this.root, 'input',["regbutton"],null,['type','value'],['button','Войти']);
        this.regButton.root.onclick = () =>{
        this.authWithGoogle();
       }
    }
    authWithGoogle(): void{
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then(() =>{
            window.location.reload();
        })
        .catch(() =>{
            console.log('bad'); 
        });
    }
}