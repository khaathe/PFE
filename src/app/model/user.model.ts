export class User {

    private _idU : number;

    private _name : string;

    private _firstName : string;

    private _role : string;

    get idU() : number {
        return this._idU;
    }

    set idU (idU : number){
        this._idU = idU;
    }

    get name () : string{
        return this._name;
    }

    set name ( name : string){
        this._name = name;
    }

    get firstName () : string {
        return this._firstName;
    }

    set firstName ( firstName : string){
        this._firstName = firstName;
    }

    get role () : string {
        return this._role;
    }

    set role ( role : string){
        this._role = role;
    }
}