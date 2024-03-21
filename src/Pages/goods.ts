import { Component } from "../Abstract/Component";
import { TCriteria, TServices } from "../Types";
import { TGood } from "../Types";
import {Cart} from "../Common/Cart"
export class GoodsPage extends Component{
    criteria:TCriteria = {
       category:"vsekat",
        sort:"cena",
        sortnastr:"up"
    };
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['goods']);
       
        const knopkisortfilt = new Component(this.root,'div',['knopkisortfilt']);
        const kopkfil = new Component(knopkisortfilt.root,'div',['kopkfil']);
        const kn1=new Component(kopkfil.root,'input',['vsekat'],null,['type','value','data-category'],['button','Все размеры','vsekat']);
        const kn2=new Component(kopkfil.root,'input',['kard'],null,['type','value','data-category'],['button','Маленькая','Малая']);
        const kn3=new Component(kopkfil.root,'input',['vakc'],null,['type','value','data-category'],['button','Средняя','Средняя']);
        const kn4=new Component(kopkfil.root,'input',['derm'],null,['type','value','data-category'],['button','Большая','Большая']);


        const kopksort = new Component(knopkisortfilt.root,'div',['kopksort']);
        new Component(kopksort.root,'p',['sorttitle'],'Сортировать по: ');

        const knS1=new Component(kopksort.root,'input',['cena'],null,['type','value','data-sort'],['button','Цена','cena']);
        const knS2=new Component(kopksort.root,'input',['naim'],null,['type','value','data-sort'],['button','Цвет','color']);
       

        const kopksortnastr = new Component(knopkisortfilt.root,'div',['kopksort']);
        const Up=new Component(kopksortnastr.root,'input',['sortnastr'],null,['type','value','data-sortnastr'],['button','↑','up']);
        const Down=new Component(kopksortnastr.root,'input',['sortnastr'],null,['type','value','data-sortnastr'],['button','↓','down']);
    
        console.log(services.dbService.dataUser);
        
       (kn1.root as HTMLInputElement).disabled=true;
       (knS1.root as HTMLInputElement).disabled=true;
       (Up.root as HTMLInputElement).disabled=true;

        const carts = new Component(this.root,"div",["carts"]);
        knopkisortfilt.root.onclick = (event) =>{

            const param=(event.target as HTMLInputElement).dataset;
            if(!param.category && !param.sort && !param.sortnastr) return;

            if (param.category) {
                this.criteria.category = param.category;
                const list = kopkfil.root.children;
                for (let item of list) {
                 (item as HTMLInputElement).disabled = false;
             }
            }
            if (param.sort) {
                this.criteria.sort = param.sort;
                const list2 = kopksort.root.children;
                for (let item of list2) {
                 (item as HTMLInputElement).disabled = false;
             }
            }
            if (param.sortnastr) {
                this.criteria.sortnastr = param.sortnastr;
                const list3 = kopksortnastr.root.children;
                for (let item of list3) {
                 (item as HTMLInputElement).disabled = false;
             }
            }
            (event.target as HTMLInputElement).disabled = true;
            services.dbService.getAllGoods(this.criteria).then((goods) =>{
               // console.log(goods);
               carts.root.innerHTML = "";
                this.putGoodsOnPage(carts,goods);
            });
            // console.log(this.criteria);
        }


        services.dbService.getAllGoods(this.criteria).then((goods) =>{
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

       
    