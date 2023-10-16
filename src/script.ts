import './style.scss';
import { Component } from './Abstract/Component';
import {Header} from './Common/Header';
import { Pages } from './Pages/pages';
import { Footer } from './Common/Footer';
import { Goods } from './Pages/goods';
import { Basket } from './Pages/basket';
import { Profile } from './Pages/profile';
import { Reg } from './Pages/reg';
import { Router } from './Common/Router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../configFB';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const body = document.body;
initializeApp(firebaseConfig);

class App{
    constructor(parrent: HTMLElement){
        const wrap = new Component(parrent, 'div', ['wrap']);
      
        new Header(wrap.root);


        const main =new Component(wrap.root, "main");

        const links = {
            '#': new Pages(main.root),
            '#goods': new Goods(main.root),
            '#basket':new Basket(main.root),
            '#profile':new Profile(main.root),
            '#reg':new Reg(main.root),
        }
        
        
        new Router (links);
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
    if (!window.app) window.app=new App(document.body);
});
