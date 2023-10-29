import { Component } from "../Abstract/Component";
import {TGood, TServices} from "../Types";

export class Cart extends Component {
    constructor(parrent: HTMLElement,services:TServices, data: TGood){
        super(parrent, "div",["cart"]);
        new Component(this.root,"img",['imggood'],null,["src","alt"],[data.url,data.name]);
        new Component(this.root,'p',['namegood'],data.name);
       
        const oformprice = new Component(this.root,'div',['oformprice']);
        new Component(oformprice.root,'p',['title_price'],'Цена: ');
        new Component(oformprice.root,'p',['text_price'],data.text_price);
       
       
        const korzbtn=new Component(this.root,'button',['korzbtn']);
        new Component(korzbtn.root,'div',['korzbtntext'],'В корзину');
        //new Component(this.root,"input",[],null,["value","type"],["В корзину","button"]);
        //new Component(this.root,'p',['pricegood'],data.price);
    }
}