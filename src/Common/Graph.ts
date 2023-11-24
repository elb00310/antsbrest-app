import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import {ru} from "date-fns/locale";
import { Component } from "../Abstract/Component";

export class Graph extends Component {
    //graphik: Chart<"bar", {x: Date; y: number, y2: number} [], Date>;
    graphik: Chart<"bar", {
        x: Date;
        y: number;
    }[] | {
        x: Date;
        y2: number;
    }[], Date>
    constructor(parrent: HTMLElement){
        super(parrent, "div",["chart"]);

        const canvas = new Component(this.root, "canvas",["graph"]);
        this.graphik = new Chart(canvas.root as HTMLCanvasElement, {
            type: "bar",
            data:{
                labels: [new Date()],
                datasets: [
                    {
                        label:"Сумма заказов",
                        data: [
                            {
                                x: new Date(),
                                y: 10
                            }
                        ],
                        backgroundColor: "#4656a1",
                        borderColor: "black",
                        borderWidth:2,
                        yAxisID: 'y'
                    }, 
                    {
                        label:"Количество заказов",
                        data: [
                            {
                                x: new Date(),
                                y: 1
                            }
                        ],
                        backgroundColor: "#FF0000",
                        borderColor: "black",
                        borderWidth:2,
                        yAxisID: 'y2'
                    }
                ]
            },
            options: {
                // plugins:{
                //     title:{
                //         //display:true,
                //         //text:"Мой график"
                //     },
                //     legend:{
                //         display:false
                //     }
                // },
                scales:{
                    x:{
                        type:"time",
                        time:{
                            unit:"day",
                            displayFormats:{
                                day:"dd.MM.yy"
                            }
                        },
                        ticks:{
                            source:"auto"
                        },
                        adapters: {
                            date: {
                                locate: ru
                            }
                        }
                    },
                    y: {
                        title:{
                            text:"рубли",
                            display:true
                        },
                        beginAtZero: true
                    },
                    y2: {
                        title:{
                            text:"количество",
                            display:true,
                        },
                        //type: 'linear',
                        position: 'right',
                        beginAtZero: true
                    }
                }
            }
        });
    }
}