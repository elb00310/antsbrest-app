import { Component } from "../Abstract/Component";
import { TGoodBasket, TServices } from "../Types";
import { CartBasket } from "../Common/CartBasket";
export class Basket extends Component{
    obvod:Component;
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['basket']);
        new Component(this.root,'p',['titlebask'],'Моя корзина');
        const baskskidk = new Component(this.root,'div',['baskskidk']);
        new Component(baskskidk.root,'p',['baskskidk1'],'Cкидка <b>10%</b> предоставляется за заказ от 2 до 3 услуг;');
        new Component(baskskidk.root,'p',['baskskidk2'],'Cкидка <b>15%</b> предоставляется за заказ от 4 услуг.');
       
        this.obvod = new Component(this.root,'div',['obvod']);
       const baskshapdiv = new Component(this.obvod.root,'div',['baskshapdiv']);
        new Component(baskshapdiv.root,'p',['shap1'],'Услуги');
        new Component(baskshapdiv.root,'p',['shap2'],'Цена');
        new Component(baskshapdiv.root,'p',['shap2'],'Количество');
        new Component(baskshapdiv.root,'p',['shap2'],'Стоимость');
        if(services.dbService.dataUser){
            services.dbService.dataUser.basket.forEach(el =>{
                this.putGoodsInBasket(this.obvod,el);
            })
        }


        //if basket is empty
        // const pust = new Component(obvod.root,'div',['pust']);
        // new Component(pust.root,'p',['empty'],'Ваша корзина пуста.');
        // new Component(pust.root,'p',['empty2'],'Добавьте товары в корзину!');

        const divDopInf = new Component(this.root,'div',['divDopInf']);
        const divSkidka =  new Component(divDopInf.root,"div",["cart_basket_skidka"]);
        new Component(divSkidka.root,'p',['skidk'],"Скидка: ");
        const divOkSum =  new Component(divDopInf.root,"div",["cart_basket_ok_sum"]);
        new Component(divOkSum.root,'p',['okSum'],"К оплате: ");

        const knopoform=new Component(this.root,'button',['knopoform']);
        new Component(knopoform.root,'div',['knopoform1'],'Оформить заказ');



         services.dbService.addListener('goodInBasket', (good) => {
            this.putGoodsInBasket(this.obvod,good as TGoodBasket);
         })

    }
    putGoodsInBasket(teg:Component,product:TGoodBasket){
        new CartBasket(teg.root,this.services,product);
    }
}