import { Component } from "../Abstract/Component";
import { TServices } from "../Types";
export class Basket extends Component{
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['basket']);
        new Component(this.root,'p',['title'],'это корзина!!!!!');

    }
}