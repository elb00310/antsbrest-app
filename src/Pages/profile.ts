import { getDocs } from "firebase/firestore";
import { Component } from "../Abstract/Component";
import { CartHistory } from "../Common/CartHistory";
// import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { TDataHistoryWithId, TServices, dataHistory } from "../Types";
import { Graph } from "../Common/Graph";
export class Profile extends Component{
    outButton:Component;
    //divClearHistory:Component;
    divHistory: Component;
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['profile']);
        
        const user = this.services.authService.user;
        const usinf = new Component(this.root,'div',['usinf']);

        new Component(usinf.root,'p',['usinf1'],'Имя: ' + user?.displayName);
        new Component(usinf.root,'p',['usinf2'],'Почта: '+ user?.email);
        new Component(this.root,'p',['proftext'],'Мой профиль');

        const zakazinf = new Component(this.root,'div',['zakazinf']);
        const spanKolvo=new Component(zakazinf.root,'span',['zakazinf1'],'Общее количество заказов: ');
        const spanSumma=new Component(zakazinf.root,'span',['zakazinf2'],'Общая сумма заказов: ');

        services.dbService.addListener('changeStat', (count, summa) => {
            spanKolvo.root.innerHTML = 'Общее количество заказов: ' + count ;
            spanSumma.root.innerHTML = 'Общая сумма заказов: ' + summa + " BYN";
         });

        services.dbService.calcCountDocsHistory(user);
        const stat = new Component(this.root,'div',['stat']);
        new Component(stat.root,'p',['stattext'],'Статистика заказов');
      
        const divGraph = new Component(this.root,'div',['statpict']);
        const graph = new Graph(divGraph.root);
       
       
       
       this.outButton = new Component(this.root, 'input',["outButton"],null,['type','value'],['button','Выйти']);
        this.outButton.root.onclick = () =>{
            this.services.authService.outFromGoogle();
           };
        const hist = new Component(this.root,'div',['hist']);
        new Component(hist.root,'p',['histtex'],'История заказов: ');
        
       const baskshapdiv = new Component(this.root,'div',['bbaskshapdiv']);
       new Component(baskshapdiv.root,'p',['sshap'],'Дата');
        new Component(baskshapdiv.root,'p',['sshap1'],'Услуги');
        new Component(baskshapdiv.root,'p',['sshap2'],'Cумма');
        new Component(baskshapdiv.root,'p',['sshap22'],'Скидка');
        new Component(baskshapdiv.root,'p',['sshap3'],'Стоимость <br /> со скидкой');

        this.divHistory = new Component(this.root, "div",["history_all"]);
        const obvod = new Component(this.divHistory.root,'div',['oobvod']);


        services.dbService.getAllHistory(user).then((historys) =>{
            this.putHistoryOnPage(obvod,historys);
            
        });

        services.dbService.addListener('addInHistory', (history) => {
            this.putHistoryOnPage(obvod,[history as dataHistory]);
            
         })

         services.dbService.getAllHistory(user).then((historys) =>{
            const dataH = services.dbService.updateDataGraph(
                historys
            );
            console.log(dataH);
            graph.graphik.data.datasets[0].data = dataH.map(l => {
                return {x:l.x,y:l.y}
            })
            graph.graphik.data.datasets[1].data = dataH.map(l => {
                return {x:l.x,y:l.y2}
            })
            graph.graphik.update();
           
         });

         services.dbService.addListener("addInHistory",(history) => {
            const user = services.authService.user;
            services.dbService.getAllHistory(user).then((historys) =>{
                const dataH = services.dbService.updateDataGraph(
                    historys
                );
                console.log(dataH);
                graph.graphik.data.datasets[0].data = dataH.map(l => {
                    return {x:l.x,y:l.y}
                })
                graph.graphik.data.datasets[1].data = dataH.map(l => {
                    return {x:l.x,y:l.y2}
                })
                graph.graphik.update();
            });

           
         })
    }
    
    putHistoryOnPage(teg:Component,historys: dataHistory[]) {
        historys.forEach((history)=>{
            new CartHistory(teg.root, this.services,history);
        });
    }

}