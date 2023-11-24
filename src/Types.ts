import { Timestamp } from "firebase/firestore";
import { AuthService } from "./Services/AuthService";
import { DBService } from "./Services/DBService";
import { LogicService } from "./Services/LogicService";

export type TServices={
    logicService:LogicService;
    authService:AuthService;
    dbService: DBService;
};

export type TGood={
    name:string;
    category:string;
    price:number;
    url:string;
    text_price:string;
    id:string
};


export type TGoodBasket={
    good: TGood;
    count:number;
};

export type TDataUser={
    name: string;
    fotoUrl: string;
    email:string;
    basket:TGoodBasket[];
}

export type TCriteria={
    category:string,
sort:string,
sortnastr:string
};

export type TDataBasket = {
    summa:number,
    percent:number,
    allSumma:number,
    count:number
};

export type dataHistory = {
    basket: TGoodBasket[];
    dataBasket: TDataBasket;
    data: Timestamp;
};

export type TDataHistoryWithId = {
    basket: TGoodBasket[];
    dataBasket: TDataBasket;
    data: Timestamp;
    id: string;
}
export type TDataGraph = {
    x: Date;
    y:number;
    y2:number;
};