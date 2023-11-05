import { Parser } from "webpack";
import { Component } from "../Abstract/Component";
import { TGood, TGoodBasket, TServices } from "../Types";

export class CartBasket extends Component {
    btnDel:Component;
    constructor(
        parrent: HTMLElement,
        private services: TServices,
        private data: TGoodBasket
    ){
        super(parrent, "div", ["cart_basket"]);

        
        new Component(this.root,'p',['cart_basket_name'],data.good.name);

        this.btnDel = new Component(this.root,"input",["cart_basket_del"],null,["value","type"],["Убрать X","button"]);

        new Component(this.root,'p',['cenatovara'],data.good.price.toString()+" BYN");

        const divCount =  new Component(this.root,"div",["cart_basket_count"]);
        const btnInk = new Component(divCount.root,'img',['plus'],null,['src','alt'],['./assets/svg/plus.svg','icon']);
        const spanCount = new Component(divCount.root,"span",["count_number"],data.count.toString());
        const btnDec = new Component(divCount.root,'img',['minus'],null,['src','alt'],['./assets/svg/minus.svg','icon']);
        new Component(divCount.root, "div",["liniya"]);

        const divSum = new Component(this.root, "div",["cart_basket_sum"],data.good.price.toString()+" BYN");

        this.btnDel.root.onclick = () =>{
            (this.btnDel.root as HTMLInputElement).disabled = true;
            this.delGoodFromBasket();
        }
    }
    delGoodFromBasket() {
        const user = this.services.authService.user;
        this.services.dbService.delGoodFromBasket(user, this.data)
        .then(() =>{
            this.Remove();
        })
        .catch (()=>{
         (this.btnDel.root as HTMLInputElement).disabled = false;
        });
    }

}