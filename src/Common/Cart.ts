import { Component } from "../Abstract/Component";
import {TGood, TServices} from "../Types";

export class Cart extends Component {
    btnBasket:Component;
    constructor(parrent: HTMLElement, private services:TServices, private data: TGood){
        super(parrent, "div",["cart"]);
        const user = this.services.authService.user;

        new Component(this.root,"img",['imggood'],null,["src","alt"],[data.url,data.name]);
        new Component(this.root,'p',['namegood'],data.name);
       
        const oformprice = new Component(this.root,'div',['oformprice']);
        new Component(oformprice.root,'p',['title_price'],'Цена: ');
        new Component(oformprice.root,'p',['text_price'],data.text_price);
       
       
        this.btnBasket=new Component(this.root,'button',['korzbtn']);
        new Component(this.btnBasket.root,'div',['korzbtntext'],'В корзину');

        if(services.dbService.dataUser){
            const index=services.dbService.dataUser.basket.findIndex(el =>el.good.id === data.id);
            if (index>=0) {
                (this.btnBasket.root as HTMLInputElement).disabled=true;
            }
        }


        this.btnBasket.root.onclick = () => {
            if (user){
                (this.btnBasket.root as HTMLInputElement).disabled = true;
                this.addGoodInBasket();
            } else{
                alert("Вы не авторизированы в системе!");
            }
        }
        services.dbService.addListener('delGoodFromBasket', (idGood) =>{
            if (idGood === data.id){
                (this.btnBasket.root as HTMLInputElement).disabled = false;
            }
        })
    }
    addGoodInBasket() {
        const user = this.services.authService.user;
        this.services.dbService.addGoodInBasket(user, this.data)
        .catch (()=>{
         (this.btnBasket.root as HTMLInputElement).disabled = false;
        });
    }
}