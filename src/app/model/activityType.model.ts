export class ActivityType {

    private code : string;

    private libelle : string;

    getCode = function () {
        return this.code;
    }

    setCode (code : string) {
        this.code = code;
    }

    getLibelle = function () {
        return this.libelle;
    }

    setLibelle (libelle : string) {
        this.libelle = libelle;
    }
    
}