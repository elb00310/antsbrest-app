import { Component } from "../Abstract/Component";
export class Goods extends Component{
    constructor(parrent:HTMLElement){
        super(parrent, 'div', ['goods']);
        new Component(this.root,'p',['title'],'это товары!!!!!');

    }
}