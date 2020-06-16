export class Activity {

    private _idA : number;

    private _period : string;

    private _dateActivity : Date;

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

    get dateActivity () : Date {
        return this._dateActivity;
    }

    set dateActivity (date:Date) {
        this._dateActivity = date;
    }

}