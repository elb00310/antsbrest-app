import { Component } from "../Abstract/Component";
// import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { TServices } from "../Types";
export class Profile extends Component{
    outButton:Component;
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['profile']);
        const usinf = new Component(this.root,'div',['usinf']);
        new Component(usinf.root,'p',['usinf1'],'Имя: ');
        new Component(usinf.root,'p',['usinf2'],'Почта: ');
        new Component(this.root,'p',['proftext'],'Мой профиль');
        const zakazinf = new Component(this.root,'div',['zakazinf']);
        new Component(zakazinf.root,'p',['zakazinf1'],'Общее количество заказов: ');
        new Component(zakazinf.root,'p',['zakazinf2'],'Общее сумма заказов: ');
        const stat = new Component(this.root,'div',['stat']);
        new Component(stat.root,'p',['stattext'],'Статистика заказов');
        new Component(this.root,'img',['statpict'],null,['src','alt'],['./assets/png/stat.png','icon']);
        this.outButton = new Component(this.root, 'input',["outButton"],null,['type','value'],['button','Выйти']);
        this.outButton.root.onclick = () =>{
            this.services.authService.outFromGoogle();
           };
        const hist = new Component(this.root,'div',['hist']);
        new Component(hist.root,'p',['histtex'],'История закзов: ');
        const shapka = new Component(hist.root,'div',['shapka']);
        new Component(shapka.root,'div',['shapkafon']);
        new Component(shapka.root,'p',['shapkatext1'],'Услуги');
        new Component(shapka.root,'p',['shapkatext2'],'Цена');
        new Component(shapka.root,'p',['shapkatext3'],'Количество');
        new Component(shapka.root,'p',['shapkatext4'],'Стоимость');
    }

}