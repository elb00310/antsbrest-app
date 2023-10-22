import { Component } from "../Abstract/Component";
import { TServices } from "../Types";
export class Goods extends Component{
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['goods']);
        new Component(this.root,'p',['title'],'это товары!!!!!');

    }
}