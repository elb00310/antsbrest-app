import { Parser } from "webpack";
import { Component } from "../Abstract/Component";
import { TDataUser, TGood, TGoodBasket, TServices, dataHistory } from "../Types";

export class CartHistory extends Component {
    

    constructor(
        parrent: HTMLElement,
        private services: TServices,
        private data: dataHistory
    ){
        super(parrent, "div", ["cart_history"]);
        
        const divOrder = new Component(this.root, "div",["cart_history_order"]);
        new Component(divOrder.root, "span",["cart_history_date"],data.data.toDate().toLocaleDateString('ru'));
        const divGoods = new Component(this.root, "div",["cart_history_goods"]);
        data.basket.forEach(goodBasket =>{
            const divGood = new Component(divGoods.root, "div",["cart_history_good"]);
            new Component(divGood.root,'span',['cart_history_name'], goodBasket.good.name);
            new Component(divGood.root,'span',['cenatovara_hist'],goodBasket.good.price +" BYN");
            new Component(divGood.root,'span',['kolvo_hist'],goodBasket.count+" шт");
        })

        const divData = new Component(this.root, "div",["cart_history_data"]);
        new Component(divData.root,'span',['sum_hist'], data.dataBasket.summa + " BYN");
        new Component(divData.root,'span',['skidk_hist'],data.dataBasket.percent + " %");
        new Component(divData.root,'span',['itogo_hist'],data.dataBasket.allSumma + " BYN");
       

    }

}