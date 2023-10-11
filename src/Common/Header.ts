import { Component } from "../Abstract/Component";

export class Header extends Component{
    constructor(parrent: HTMLElement){
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
        
        personalAcc.root.addEventListener("click", () => {
              window.location.hash = '#profile'
        })
        logo.root.addEventListener("click", () => {
            window.location.hash = '#'
      })
      bask.root.addEventListener("click", () => {
            window.location.hash = '#basket'
      })


}
}