import { Component } from "../Abstract/Component";
export class Footer extends Component{
    constructor(parrent: HTMLElement){
        super(parrent, 'div', ['footer']);
        new Component(this.root,'div',['footchild']);
        const infofut = new Component(this.root,'div',['infofut']);

        new Component(infofut.root,'p',['foo'],'+375298057588');
        new Component(infofut.root,'p',['foo1'],'ул. Советская 17');
        new Component(infofut.root,'p',['foo2'],'elb00310@g.by');
        const fam = new Component(this.root,'div',['fam']);
        new Component(fam.root,'p',['kriv'],'Кривоносова Е.А., ЭЛБ-3');
}}