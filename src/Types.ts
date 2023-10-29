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

export type TDataUser={
    name: string;
    fotoUrl: string;
    email:string;
}