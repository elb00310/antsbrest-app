import { Component } from "../Abstract/Component";
export class Profile extends Component{
    constructor(parrent:HTMLElement){
        super(parrent, 'div', ['profile']);
        new Component(this.root,'p',['title'],'это профиль!!!!!');

    }
}