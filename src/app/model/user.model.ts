export class User {

    private idU : number;

    private name : string;

    private firstName : string;

    private role : string;

    constructor() {
        this.idU = null;
        this.name = null;
        this.firstName = null;
        this.role = null;
    }

    getIdU = function () : number {
        return this.idU;
    }

    setIdU = function (idU : number) : void {
        this.idU = idU;
    }

    getName = function () : string{
        return this.name;
    }

    setName = function ( name : string){
        this.name = name;
    }

    getFirstName = function () : string {
        return this.firstName;
    }

    setFirstName = function ( firstName : string){
        this.firstName = firstName;
    }

    getRole = function () : string {
        return this.role;
    }

    setRole = function ( role : string){
        this.role = role;
    }
}