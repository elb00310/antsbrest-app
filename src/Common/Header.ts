import { Component } from "../Abstract/Component";
// import {getAuth} from "firebase/auth";
import { TServices } from "../Types";
export class Header extends Component{
    //constructor(parrent: HTMLElement, emailAdmin: boolean, private services:TServices){
        constructor(parrent: HTMLElement, private services:TServices){
        super(parrent, 'div', ['header']);
        
        const logo = new Component(this.root, 'img', ["icon"],null,['src','alt'],['./assets/png/logotip.png','icon'] );

        new Component(this.root,'p',['title'],'Ants Brest');

        const info = new Component(this.root,'div',['info']);
        new Component(info.root,'div',['infchild']);
        new Component(info.root,'p',['inf'],'+375295867271');
        new Component(info.root,'p',['inf1'],'ул. Советская 128');
        new Component(info.root,'p',['inf2'],'@ants.brest');

        const personalAcc = new Component(this.root,'img',['icon1'],null,['src','alt'],['./assets/svg/person.svg','icon']);
        const bask = new Component(this.root,'img',['icon2'],null,['src','alt'],['./assets/svg/shopping-basket.svg','icon']);

        const user = this.services.authService.user;

        let isAdmin = false;
        if (user && user.email == services.logicService.emailAdmin) {
        isAdmin = true;
        }

        if (user && !isAdmin) {
            bask.Render()
         } else {
            bask.Remove();
         }

         this.services.authService.addListener('userAuth',(isAuthUser)=>{
            if (isAuthUser){
                bask.Render();
            } else {
                bask.Remove(); 
            }
           })
        
        const url = window.location.hash.slice(1);
        personalAcc.root.addEventListener("click", () => {
            if (!user){
                  window.location.hash = '#reg'
                  } else {
                    if (isAdmin){
                        window.location.hash = '#stat'
                    }
                   else{
                  window.location.hash = '#profile'
                    }
                  }
      })

        logo.root.addEventListener("click", () => {
            window.location.hash = '#'
      })
      bask.root.addEventListener("click", () => {
            window.location.hash = '#basket'
      })
}
}