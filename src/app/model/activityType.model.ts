/**
 * Classe pour réprésenter les types d'activité
 */
export class ActivityType {

    /** Code l'activité */
    private _code : string;

    /** libellé de l'activité */
    private _libelle : string;

    /** Getter */
    get code () {
        return this._code;
    }

    /** Setter */
    set code (code : string) {
        this._code = code;
    }

    /** Getter */
    get libelle () {
        return this._libelle;
    }

    /** Setter */
    set libelle (libelle : string) {
        this._libelle = libelle;
    }
    
}