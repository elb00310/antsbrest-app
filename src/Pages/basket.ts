import { Component } from "../Abstract/Component";
export class Basket extends Component{
    constructor(parrent:HTMLElement){
        super(parrent, 'div', ['basket']);
        new Component(this.root,'p',['title'],'это корзина!!!!!');

    }
}