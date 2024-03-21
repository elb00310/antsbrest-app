import { Parser } from "webpack";
import { Component } from "../Abstract/Component";
import { TDataUser, TGood, TGoodBasket, TServices } from "../Types";

export class CartBasket extends Component {
    btnDel:Component;
    spanCount:Component;
    spanSum:Component;
    constructor(
        parrent: HTMLElement,
        private services: TServices,
        private data: TGoodBasket
    ){
        super(parrent, "div", ["cart_basket"]);

        
        new Component(this.root,'p',['cart_basket_name'],data.good.name);

        this.btnDel = new Component(this.root,"input",["cart_basket_del"],null,["value","type"],["Убрать X","button"]);


        new Component(this.root,'p',['cenatovara'],data.good.price.toString()+" BYN");
        this.spanSum = new Component(this.root, "span",["cart_basket_sum"], services.dbService.calcCostGood(data.count,data.good.price).toString()+" BYN");




        const divCount =  new Component(this.root,"div",["cart_basket_count"]);
        const btnDec = new Component(divCount.root,'img',['minus'],null,['src','alt'],['./assets/svg/minus.svg','icon']);
        
        this.spanCount = new Component(divCount.root,"span",["count_number"],data.count.toString());

        const btnInk = new Component(divCount.root,'img',['plus'],null,['src','alt'],['./assets/svg/plus.svg','icon']);
        new Component(divCount.root, "div",["liniya"]);
        btnDec.root.onclick = () =>{
            this.changeCountGood(-1);
        }

        btnInk.root.onclick = () =>{
            this.changeCountGood(1);
        }
     

        this.btnDel.root.onclick = () =>{
            (this.btnDel.root as HTMLInputElement).disabled = true;
            this.delGoodFromBasket();
        }
    }


    changeCountGood(grad: number){
        const newCount = this.data.count + grad;
        if (newCount<=0) return;

        const newData = {} as TGoodBasket;
        Object.assign(newData, this.data);
        newData.count = newCount;

        const user = this.services.authService.user;
        this.services.dbService.changeGoodInBasket(user,newData).then(() => {
            Object.assign(this.data, newData);
            this.spanCount.root.innerHTML = this.data.count.toString();
            this.spanSum.root.innerHTML = this.services.dbService.calcCostGood(this.data.count,this.data.good.price).toString()+" BYN";
        })
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