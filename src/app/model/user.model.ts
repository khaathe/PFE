/**
 * Classe pour représenter un utilisateur
 */
export class User {

    /** identifiant de l'utilisateur */
    private _idU : string;

    /** Nom de l'utilisateur */
    private _nom : string;

    /** Prénom de l'utilisateur */
    private _prenom : string;

    /** Rôle de l'utilisateur */
    private _role : string;

    /** Getter */
    get idU() : string {
        return this._idU;
    }

    /** Setter */
    set idU (idU : string){
        this._idU = idU;
    }

    /** Getter */
    get nom () : string{
        return this._nom;
    }

    /** Setter */
    set nom ( name : string){
        this._nom = name;
    }

    /** Getter */
    get prenom () : string {
        return this._prenom;
    }

    /** Setter */
    set prenom ( firstName : string){
        this._prenom = firstName;
    }

    /** Getter */
    get role () : string {
        return this._role;
    }

    /** Setter */
    set role ( role : string){
        this._role = role;
    }
}