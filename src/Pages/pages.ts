import { Component } from "../Abstract/Component";
import { TServices } from "../Types";
export class Pages extends Component{
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div',['pages']);
        new Component(this.root, 'img', ["anim"],null,['src','alt'],['./assets/png/ferm.png','icon'] );
        new Component(this.root, 'img', ["fon"],null,['src','alt'],['./assets/png/ants.png','icon'] );
        new Component(this.root,'p',["titlehero"],'Муравьиные фермы | Брест');
        new Component(this.root,'p',["texthero"],'Наш магазин – официальный представитель белорусского производителя формикариев с многолетним опытом работы. Магазин имеет ветеринарный сертификат качества. Мы гарантируем качество каждого домика и готовы помочь вам с любым волнующим вопросом!');
        const kn=new Component(this.root,'button',['btn']);
        new Component(kn.root,'div',['textkn'],'Каталог товаров');
        kn.root.addEventListener("click", () => {
            window.location.hash = '#goods'
      })
    }
}