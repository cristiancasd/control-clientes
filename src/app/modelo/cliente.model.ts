export interface Cliente{
    
    //Ese simbolo de ? es porque todos
    //van a ser opcionales
    id?:string;
    nombre?:string;
    apellido?:string;
    email?:string;
    saldo:number
}