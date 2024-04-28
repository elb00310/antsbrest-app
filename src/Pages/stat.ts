import { getDocs } from "firebase/firestore";
import { Component } from "../Abstract/Component";
import { AdminCartHistory } from "../Common/AdminCartHistory";
//import { CartHistory } from "../Common/CartHistory";
// import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { TDataHistoryWithId, TServices, dataHistory,AdmindataHistory } from "../Types";
import { Graph } from "../Common/Graph";
export class Stat extends Component{
    outButton:Component;
    //divClearHistory:Component;
    divHistory: Component;
    constructor(parrent:HTMLElement, private services:TServices){
        super(parrent, 'div', ['profile']);
        
        const user = this.services.authService.user;
        const usinf = new Component(this.root,'div',['usinf']);

        new Component(usinf.root,'p',['usinf1'],'Имя: ' + user?.displayName);
        new Component(usinf.root,'p',['usinf2'],'Почта: '+ user?.email);
        new Component(this.root,'p',['a_proftext'],'Панель администратора');

        const zakazinf = new Component(this.root,'div',['zakazinf']);
        const spanKolvo=new Component(zakazinf.root,'span',['zakazinf1'],'Общее количество заказов: ');
        const spanSumma=new Component(zakazinf.root,'span',['zakazinf2'],'Общая сумма заказов: ');

        services.dbService.addListener('AdmChangeStat', (count, summa) => {
            spanKolvo.root.innerHTML = 'Общее количество заказов: ' + count ;
            spanSumma.root.innerHTML = 'Общая сумма заказов: ' + summa + " BYN";
         });

        services.dbService.AdminCalcCountDocsHistory(user);
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
        new Component(baskshapdiv.root,'p',['sshap1'],'Товары');
        new Component(baskshapdiv.root,'p',['sshap2'],'Cумма');
        new Component(baskshapdiv.root,'p',['sshap22'],'Скидка');
        new Component(baskshapdiv.root,'p',['sshap3'],'Стоимость <br /> со скидкой');

        this.divHistory = new Component(this.root, "div",["history_all"]);
        const obvod = new Component(this.divHistory.root,'div',['oobvod']);


        services.dbService.AdminGetAllHistory(user).then((historys) =>{
            this.AdminPutHistoryOnPage(obvod,historys);
            
        });

        services.dbService.addListener('AdmAddInHistory', (history) => {
            this.AdminPutHistoryOnPage(obvod,[history as AdmindataHistory]);
         })

         services.dbService.AdminGetAllHistory(user).then((historys) =>{
            const dataH = services.dbService.AdminUpdateDataGraph(
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

         services.dbService.addListener("AdmAddInHistory",(history) => {
            const user = services.authService.user;
            services.dbService.AdminGetAllHistory(user).then((historys) =>{
                const dataH = services.dbService.AdminUpdateDataGraph(
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


    AdminPutHistoryOnPage(teg:Component,historys: AdmindataHistory[]) {
        const sortedHistorys = historys.sort((a, b) => {
            const timestampA = b.data.seconds;
            const timestampB = a.data.seconds;
        
            return timestampA - timestampB;
          });
          sortedHistorys.forEach((history) => {
            new AdminCartHistory(teg.root, this.services, history);
          });

        // historys.forEach((history)=>{
        //     new AdminCartHistory(teg.root, this.services,history);
        // });
    }
}


