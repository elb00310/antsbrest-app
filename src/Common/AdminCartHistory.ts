import { Parser } from "webpack";
import { Component } from "../Abstract/Component";
import { TDataUser, TGood, TGoodBasket, TServices, AdmindataHistory } from "../Types";
import { documentId } from "firebase/firestore";

export class AdminCartHistory extends Component {
    constructor(
        parrent: HTMLElement,
        private services: TServices,
        private data: AdmindataHistory
    ){
        super(parrent, "div", ["admin_cart_history"]);
        
        const divOrder = new Component(this.root, "div",["a_cart_history_order"]);
        new Component(divOrder.root, "span",["a_cart_history_date"],data.data.toDate().toLocaleDateString('ru'));
        const divGoods = new Component(this.root, "div",["a_cart_history_goods"]);
        data.basket.forEach(goodBasket =>{
            const divGood = new Component(divGoods.root, "div",["a_cart_history_good"]);
            new Component(divGood.root,'span',['a_cart_history_name'], goodBasket.good.name);
            new Component(divGood.root,'span',['a_cenatovara_hist'],goodBasket.good.price +" BYN");
            new Component(divGood.root,'span',['a_kolvo_hist'],goodBasket.count+" шт");
        })

        const divDataUser = new Component(this.root, "div",["a_cart_history_user"]);
        new Component(divDataUser.root,'span',['user_name'], data.phone);
        new Component(divDataUser.root,'span',['user_email'], data.name);

        const divData = new Component(this.root, "div",["a_cart_history_data"]);
        new Component(divData.root,'span',['a_sum_hist'], data.dataBasket.summa + " BYN");
        new Component(divData.root,'span',['a_skidk_hist'],data.dataBasket.percent + " %");
        new Component(divData.root,'span',['a_itogo_hist'],data.dataBasket.allSumma + " BYN");
       
    }
    
    
}