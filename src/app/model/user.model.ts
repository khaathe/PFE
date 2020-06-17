export class User {

    private _idU : string;

    private _nom : string;

    private _prenom : string;

    private _role : string;

    get idU() : string {
        return this._idU;
    }

    set idU (idU : string){
        this._idU = idU;
    }

    get nom () : string{
        return this._nom;
    }

    set nom ( name : string){
        this._nom = name;
    }

    get prenom () : string {
        return this._prenom;
    }

    set prenom ( firstName : string){
        this._prenom = firstName;
    }

    get role () : string {
        return this._role;
    }

    set role ( role : string){
        this._role = role;
    }
}