import './style.scss';
import { Component } from './Abstract/Component';
import {Header} from './Common/Header';
import { Pages } from './Pages/pages';
import { Footer } from './Common/Footer';
import { GoodsPage } from './Pages/goods';
import { Basket } from './Pages/basket';
import { Profile } from './Pages/profile';
import { Reg } from './Pages/reg';
import { Router } from './Common/Router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../configFB';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LogicService } from './Services/LogicService';
import { AuthService } from './Services/AuthService';
import{ getFirestore} from 'firebase/firestore';
import { DBService } from './Services/DBService';

const body = document.body;
const DBFirestore = initializeApp(firebaseConfig);

const services={
    logicService: new LogicService(),
    authService: new AuthService(),
    dbService: new DBService(DBFirestore)
}
class App{
    constructor(parrent: HTMLElement){
        const wrap = new Component(parrent, 'div', ['wrap']);
        new Header(wrap.root,services);
        const main =new Component(wrap.root, "main");
        const links = {
            '#': new Pages(main.root,services),
            '#goods': new GoodsPage(main.root,services),
            '#basket':new Basket(main.root,services),
            '#profile':new Profile(main.root,services),
            '#reg':new Reg(main.root,services),
        }
        
        new Router (links,services);
        new Footer(wrap.root);
    }
}
declare global{
    interface Window{
        app: App;
    }
}
const auth = getAuth();
onAuthStateChanged(auth,(user)=>{
    services.authService.user = user;
    services.dbService
    .getDataUser(user)
    .then(() => {
        if (!window.app) window.app=new App(document.body);
    })
    .catch((error) =>{
        console.log(error);
    });
});
