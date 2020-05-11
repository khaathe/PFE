export class Activity {

    private _idA : number;

    private _period : string;

    private _date : Date;

    private _activityType : string;

    private _comments : string;


    get idA  () {
        return this._idA;
    }

    set idA (idA : number) {
        this._idA = idA;
    }

    get period () : string{
        return this._period;
    }

    set period ( period : string){
        this._period = period;
    }

    get activityType () : string{
        return this._activityType;
    }

    set activityType ( activityType : string){
        this._activityType = activityType;
    }

    get comments () : string{
        return this._comments;
    }

    set comments ( comments : string){
        this._comments = comments;
    }

    get date () : Date {
        return this._date;
    }

    set date (date:Date) {
        this._date = date;
    }

}