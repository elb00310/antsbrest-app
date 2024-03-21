import { Component } from "../Abstract/Component";
import { TGoodBasket, TServices, TDataBasket } from "../Types";
import { CartBasket } from "../Common/CartBasket";
export class Basket extends Component{
    obvod:Component;
    divSkidka:Component;
    divSum: Component;
    divOkSum: Component;
    divClearBasket:Component;
    divBasket:Component;

    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['basket']);
        services.dbService.calcDataBasket();

        new Component(this.root,'p',['titlebask'],'Моя корзина');
        const baskskidk = new Component(this.root,'div',['baskskidk']);
        new Component(baskskidk.root,'p',['baskskidk1'],'Cкидка <b>10%</b> предоставляется за заказ от 2 до 3 ферм;');
        new Component(baskskidk.root,'p',['baskskidk2'],'Cкидка <b>15%</b> предоставляется за заказ от 4 ферм.');
       

        
       const baskshapdiv = new Component(this.root,'div',['baskshapdiv']);
        new Component(baskshapdiv.root,'p',['shap1'],'Товары');
        new Component(baskshapdiv.root,'p',['shap2'],'Цена');
        new Component(baskshapdiv.root,'p',['shap2'],'Количество');
        new Component(baskshapdiv.root,'p',['shap2'],'Стоимость');

        let isBasketClear = false;
        console.log(services.dbService.dataUser);
        if (services.dbService.dataUser) {
            if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
        };
        
        
        this.divClearBasket = new Component(this.root, "div",["pust"]);
        new Component(this.divClearBasket.root,'p',['empty'],'Ваша корзина пуста.');
        new Component(this.divClearBasket.root,'p',['empty2'],'Добавьте товары в корзину!');

        
        
        this.divBasket = new Component(this.root, "div",["basket_all"]);
        this.obvod = new Component(this.divBasket.root,'div',['obvod']);

        this.toggleBasket(isBasketClear);
        
        if(services.dbService.dataUser){
            services.dbService.dataUser.basket.forEach(el =>{
                console.log(el);
                this.putGoodsInBasket(this.obvod,el);
            })
        }

        const divDopInf = new Component(this.divBasket.root,'div',['divDopInf']);
        this.divSum =  new Component(divDopInf.root,"span",["cart_basket_summa"],"Cумма: " + services.dbService.dataBasket.summa + " BYN");
        this.divSkidka =  new Component(divDopInf.root,"span",["cart_basket_skidka"],"Скидка: " + services.dbService.dataBasket.percent + " %");
        this.divOkSum =  new Component(divDopInf.root,"span",["cart_basket_ok_sum"],"К оплате: " + services.dbService.dataBasket.allSumma + " BYN");
       
        const divtel = new Component(this.divBasket.root,'div',['tel']);
        new Component(divtel.root,'p',['usinf31'],'Введите номер телефона:');
        const telefon = new Component(divtel.root, 'input', ['usinf32'], null, ['placeholder'],['+375(29)8888888']);

        
        const divOform = new Component(this.divBasket.root,'div',['divOform']);
        const knopoform=new Component(divOform.root,'input',['knopoform'],null,['value','type'],['Оформить заказ','button']);

        knopoform.root.onclick = () =>{
            const tel = (telefon.root as HTMLInputElement).value;
            if(tel.trim()){
                const user = services.authService.user;
                services.dbService.addBasketInHistory(user,tel);
                } else{
                    alert('Укажите номер телефона!');
                }
        }




        services.dbService.addListener('goodInBasket', (good) => {
            this.putGoodsInBasket(this.obvod,good as TGoodBasket);
            this.toggleBasket(true);

         })

         services.dbService.addListener('changeDataBasket', (dataBasket) => {
            this.divSum.root.innerHTML = "Cумма: " + (dataBasket as TDataBasket).summa.toString() + " BYN";
            this.divSkidka.root.innerHTML = "Скидка: " + (dataBasket as TDataBasket).percent.toString() + " %";
            this.divOkSum.root.innerHTML = "К оплате: " + (dataBasket as TDataBasket).allSumma.toString() + " BYN";
            isBasketClear = false;
            if (services.dbService.dataUser) {
                if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
            };
            this.toggleBasket(isBasketClear);
         })

         services.dbService.addListener('clearBasket', () => {
            this.obvod.root.innerHTML = " ";
            this.toggleBasket(false);
         })

       

    }
    putGoodsInBasket(teg:Component,product:TGoodBasket){
        new CartBasket(teg.root,this.services,product);
    }

    toggleBasket(isBasketClear: boolean){
    if(isBasketClear) {
        this.divClearBasket.Remove();
        this.divBasket.Render();
    } else {
        this.divBasket.Remove();
        this.divClearBasket.Render();
        
    }
}

}