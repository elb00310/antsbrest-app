import { Component } from "../Abstract/Component";
export class Reg extends Component{
    constructor(parrent:HTMLElement){
        super(parrent, 'div', ['reg']);
        new Component(this.root,'p',['title'],'это регистр!!!!');

    }
}