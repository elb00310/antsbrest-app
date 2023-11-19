import { Component } from "../Abstract/Component";
// import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { TServices } from "../Types";
export class Profile extends Component{
    outButton:Component;
    divClearHistory:Component;
    //divHistory: Component;
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['profile']);
        const user = this.services.authService.user;
        const usinf = new Component(this.root,'div',['usinf']);
        new Component(usinf.root,'p',['usinf1'],'Имя: ' + user?.displayName);
        new Component(usinf.root,'p',['usinf2'],'Почта: '+ user?.email);
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
        new Component(hist.root,'p',['histtex'],'История заказов: ');
        
       const baskshapdiv = new Component(this.root,'div',['bbaskshapdiv']);
       new Component(baskshapdiv.root,'p',['sshap'],'Дата');
        new Component(baskshapdiv.root,'p',['sshap1'],'Услуги');
        new Component(baskshapdiv.root,'p',['sshap2'],'Цена');
        new Component(baskshapdiv.root,'p',['sshap2'],'Количество');
        new Component(baskshapdiv.root,'p',['sshap2'],'Стоимость');
        
       // this.divHistory = new Component(this.root, "div",["history_all"]);
       // const obvod = new Component(this.divHistory.root,'div',['oobvod']);
        
        this.divClearHistory = new Component(this.root, "div",["ppust"]);
        new Component(this.divClearHistory.root,'p',['empty'],'Ваша история заказов пуста.');
        new Component(this.divClearHistory.root,'p',['empty2'],'Оформите заказ!');
    }

}