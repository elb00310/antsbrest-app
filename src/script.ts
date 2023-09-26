import { Component } from './Abstract/Component';
import './style.scss';
const body = document.body;
const prg = new Component(body,"p","hello");

const btn1 = new Component(body,"button","показать");
const btn2 =new Component(body,"button","скрыть");


btn1.root.onclick = () =>{
    prg.myRender();
}

btn2.root.onclick = () =>{
    prg.myRemove();
}


