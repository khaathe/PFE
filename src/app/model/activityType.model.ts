export class ActivityType {

    private _code : string;

    private _libelle : string;

    get code () {
        return this._code;
    }

    set code (code : string) {
        this._code = code;
    }

    get libelle () {
        return this._libelle;
    }

    set libelle (libelle : string) {
        this._libelle = libelle;
    }
    
}