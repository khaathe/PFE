export class Activity {

    private idA : number;

    private period : string;

    private date : Date;

    private activityType : string;

    private rAndD : boolean;

    private comments : string;


    getIdA = function () : number {
        return this.idA;
    }

    setIdA = function (idA : number) : void {
        this.idA = idA;
    }

    getPeriod = function () : string{
        return this.period;
    }

    setPeriod = function ( period : string){
        this.period = period;
    }

    getActivityType = function () : string{
        return this.activityType;
    }

    setActivityType = function ( activityType : string){
        this.activityType = activityType;
    }

    getComments = function () : string{
        return this.comments;
    }

    setComments = function ( comments : string){
        this.comments = comments;
    }

    getDate = function() : Date {
        return this.date;
    }

    setDate = function (date:Date) {
        this.date = date;
    }

    isRAndD = function () {
        return this.rAndD;
    }

    setRAndD = function (rAndD:boolean) {
        this.rAndD = rAndD;
    }

}