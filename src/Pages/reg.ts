import { Component } from "../Abstract/Component";
// import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { TServices } from "../Types";
export class Reg extends Component{
    regButton:Component;
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['reg']);
        new Component(this.root,'p',['title_reg'],'Регистрация');
        new Component(this.root, 'img', ["dogpict"],null,['src','alt'],['./assets/png/dogreg.png','icon'] );
        this.regButton = new Component(this.root, 'input',["regbutton"],null,['type','value'],['button','Войти']);
        this.regButton.root.onclick = () =>{
        this.services.logicService.authWithGoogle();
       }
       this.services.logicService.addListener('userAuth',(isAuthUser)=>{
        if (isAuthUser){
            
        }
       })
    }
   
    
}