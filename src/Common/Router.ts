import { Component } from "../Abstract/Component";
// import {getAuth} from "firebase/auth";
import { TServices } from "../Types";
export class Router {
    constructor(public links: Record<string, Component>, private services:TServices) {
        this.openPage();

        window.onhashchange = () => {
            this.openPage();
        }
    }

    openPage() {
        Object.values(this.links).forEach((el) => el.Remove())

        const url = window.location.hash.slice(1);
        // const auth=getAuth();
        // const user = auth.currentUser;
        const user = this.services.logicService.user;
        if ((url === 'basket' && !user)||(url === 'profile' && !user)){
        this.links['#reg'].Render();
        } else {
        this.links['#' + url].Render();
        }
        if (url === 'reg' && user){
             this.links['#reg'].Remove();
             this.links['#profile'].Render();
     }

}

    }
