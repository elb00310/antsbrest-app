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
        const user = this.services.authService.user;
        if ((url === 'basket' && !user)||(url === 'profile' && !user)||(url === 'stat' && !user)){
        this.links['#reg'].Render();
        } else {
        this.links['#' + url].Render();
        }

        let isAdmin = false;
        if (user && user.email == this.services.logicService.emailAdmin) {
        isAdmin = true;
        }
        if (url === 'reg' && user && !isAdmin){
             this.links['#reg'].Remove();
             this.links['#profile'].Render();
     }
        if (url === 'stat' && user && !isAdmin){
            this.links['#stat'].Remove();
            this.links['#profile'].Render();
    }
        if (url === 'profile' && user && isAdmin){
            this.links['#profile'].Remove();
            this.links['#stat'].Render();
    }
        if (url === 'basket' && user && isAdmin){
            this.links['#basket'].Remove();
            this.links['#stat'].Render();
    }

}

    }
