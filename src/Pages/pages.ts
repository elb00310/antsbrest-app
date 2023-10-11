import { Component } from "../Abstract/Component";
export class Pages extends Component{
    constructor(parrent:HTMLElement){
        super(parrent, 'div',['pages']);
        new Component(this.root, 'img', ["anim"],null,['src','alt'],['./assets/png/animals.png','icon'] );
        new Component(this.root, 'img', ["fon"],null,['src','alt'],['./assets/png/fon.png','icon'] );
        new Component(this.root,'p',["titlehero"],'Альфа-Вет');
        new Component(this.root,'p',["texthero"],'Врачи ветеринарной клиники «Альфа-Вет» всегда готовы помочь вашему домашнему любимцу справиться с недугом, а также проконсультировать вас по всем волнующим вопросам');
        const kn=new Component(this.root,'button',['btn']);
        new Component(kn.root,'div',['textkn'],'Каталог услуг');
        kn.root.addEventListener("click", () => {
            window.location.hash = '#goods'
      })
    }
}