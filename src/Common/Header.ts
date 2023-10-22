import { Component } from "../Abstract/Component";
// import {getAuth} from "firebase/auth";
import { TServices } from "../Types";
export class Header extends Component{
    constructor(parrent: HTMLElement, private services:TServices){
        super(parrent, 'div', ['header']);
        
        const logo = new Component(this.root, 'img', ["icon"],null,['src','alt'],['./assets/png/logo.png','icon'] );

        new Component(this.root,'p',['title'],'Альфа-Вет');

        const info = new Component(this.root,'div',['info']);
        new Component(info.root,'div',['infchild']);
        new Component(info.root,'p',['inf'],'+375298057588');
        new Component(info.root,'p',['inf1'],'ул. Советская 17');
        new Component(info.root,'p',['inf2'],'Круглосуточно');

        const personalAcc = new Component(this.root,'img',['icon1'],null,['src','alt'],['./assets/svg/person.svg','icon']);
        const bask = new Component(this.root,'img',['icon2'],null,['src','alt'],['./assets/svg/shopping-basket.svg','icon']);
        
        const user = this.services.logicService.user;
        if (user) {
            bask.Render()
         } else {
            bask.Remove();
         }
        
         this.services.logicService.addListener('userAuth',(isAuthUser)=>{
            if (isAuthUser){
                bask.Render();
            } else {
                bask.Remove(); 
            }
           })
        
        const url = window.location.hash.slice(1);
      //   const auth=getAuth();
      //   const user = auth.currentUser;
      //const user = this.services.logicService.user;
        personalAcc.root.addEventListener("click", () => {
            if (!user){
                  window.location.hash = '#reg'
                  } else {
                  window.location.hash = '#profile'
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