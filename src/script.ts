import './style.scss';
import { Component } from './Abstract/Component';
import {Header} from './Common/Header';
import { Pages } from './Pages/pages';
import { Footer } from './Common/Footer';
import { Goods } from './Pages/goods';
import { Basket } from './Pages/basket';
import { Profile } from './Pages/profile';
import { Reg } from './Pages/reg';

const body = document.body;

class App{
    constructor(parrent: HTMLElement){
        const wrap = new Component(parrent, 'div', ['wrap']);
        new Header(wrap.root);
        new Pages (wrap.root);
        new Goods (wrap.root);
        new Basket (wrap.root);
        new Profile (wrap.root);
        new Reg (wrap.root);
        new Footer(wrap.root);
    }
}

declare global{
    interface Window{
        app: App;
    }
}

window.app=new App(document.body);