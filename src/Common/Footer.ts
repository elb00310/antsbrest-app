import { Component } from "../Abstract/Component";
export class Footer extends Component{
    constructor(parrent: HTMLElement){
        super(parrent, 'div', ['footer']);
        new Component(this.root,'div',['footchild']);
        const infofut = new Component(this.root,'div',['infofut']);

        new Component(infofut.root,'p',['foo'],'+375295867271');
        new Component(infofut.root,'p',['foo1'],'ул. Советская 128');
        new Component(infofut.root,'p',['foo2'],'@ants.brest');
        const fam = new Component(this.root,'div',['fam']);
        new Component(fam.root,'p',['kriv'],'Кривоносова Е.А., ЭЛБ-3');

        const inst = new Component(this.root, 'img', ["inst"],null,['src','alt'],['./assets/svg/inst.svg','icon'] );
        inst.root.addEventListener("click", () => {
            location.href='https://www.instagram.com/ants.brest/';
      })
}}