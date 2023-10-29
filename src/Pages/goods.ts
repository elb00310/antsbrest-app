import { Component } from "../Abstract/Component";
import { TServices } from "../Types";
import { TGood } from "../Types";
import {Cart} from "../Common/Cart"
export class GoodsPage extends Component{
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['goods']);
        
        const kopkfil = new Component(this.root,'div',['kopkfil']);
        const kn1=new Component(kopkfil.root,'button',['vsekat']);
        new Component(kn1.root,'div',['fil1'],'Все категории');
        const kn2=new Component(kopkfil.root,'button',['kard']);
        new Component(kn2.root,'div',['fil2'],'Кардиология');
        const kn3=new Component(kopkfil.root,'button',['vakc']);
        new Component(kn3.root,'div',['fil3'],'Вакцинация');
        const kn4=new Component(kopkfil.root,'button',['derm']);
        new Component(kn4.root,'div',['fil4'],'Дерматология');

        const kopksort = new Component(this.root,'div',['kopksort']);
        new Component(kopksort.root,'p',['sorttitle'],'Сортировать по: ');
        const knS1=new Component(kopksort.root,'button',['cena']);
        new Component(knS1.root,'div',['sort1'],'Цена');
        const knS2=new Component(kopksort.root,'button',['naim']);
        new Component(knS2.root,'div',['sort2'],'Наименование');


        const carts = new Component(this.root,"div",["carts"]);

        services.dbService.getAllGoods().then((goods) =>{
            console.log(goods);
            this.putGoodsOnPage(carts,goods);
        });
    }
        putGoodsOnPage(teg:Component,goods: TGood[]) {
            goods.forEach((product)=>{
                new Cart(teg.root, this.services,product);
            });
          
        }



    }

       
    