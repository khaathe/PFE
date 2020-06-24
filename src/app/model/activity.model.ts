/**
 * Classe pour représenter l'objet Activité
 */
export class Activity {

    /** Id de l'activité */
    idA : number;

    /** Période de l'activité  */
    period : string;

    /** Date de l'activité */
    dateActivity : Date;

    /** Type de l'activité */
    activityType : string;

    /** Commentaire de l'activité */
    comments : string;

    /** Constructeur */
    constructor(){
        this.idA=null;
        this.period=null;
        this.dateActivity = null;
        this.activityType=null;
        this.comments=null;
    }
}