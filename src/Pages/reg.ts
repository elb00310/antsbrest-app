import { Component } from "../Abstract/Component";
// import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { TServices } from "../Types";
export class Reg extends Component{
    regButton:Component;
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['reg']);
        const form = new Component(this.root,'div',['form']);
        new Component(form.root,'p',['title_reg'],'Регистрация');
        new Component(form.root,'p',['title_reg2'],'с помощью сервиса Google');
        //new Component(this.root, 'img', ["dogpict"],null,['src','alt'],['./assets/png/dogreg.png','icon'] );
        new Component(this.root, 'img', ["reg1"],null,['src','alt'],['./assets/png/reg1.png','icon'] );
        new Component(this.root, 'img', ["reg2"],null,['src','alt'],['./assets/png/reg2.png','icon'] );
        new Component(this.root, 'img', ["reg3"],null,['src','alt'],['./assets/png/reg3.png','icon'] );
        this.regButton = new Component(form.root, 'input',["regbutton"],null,['type','value'],['button','Войти']);
        this.regButton.root.onclick = () =>{
        this.services.authService.authWithGoogle();
       }
    //    this.services.authService.addListener('userAuth',(isAuthUser)=>{
    //     if (isAuthUser){
            
    //     }
    //    })
    }
   
    
}