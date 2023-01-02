import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { Ured } from "./ured.model";

@Injectable({providedIn: 'root'})
export class UredService{

  loadedUredi:any[];
  oneUred:Ured
  rvUred;

  constructor(private http: HttpClient){}

  nodeUrl = 'http://127.0.0.1:3001/';

  dajUredeNode(){
    return this.http.get(this.nodeUrl + 'uredi')
    .pipe(
      map((resData:[]) =>{
        let result = [];
        resData.forEach(element => {
          if(Object.keys(element).length == 14){
            result.push(element);
          }
        });
        return result
      }),catchError(this.handleError));
  }

  dajUredPoPU(pu){
    return this.http.get(this.nodeUrl + 'uredi/'+ pu)
    .pipe(
      map((responseData) => {
        return responseData;
        //console.log(this.oneUred)
      }),
      catchError(this.handleError));
  }
  dajRvUreda(pu){
    return this.http.get(this.nodeUrl + 'uredrv/'+ pu)
    .pipe(
      map((responseData) => {
        return responseData;
        //console.log(this.oneUred)
      }),
      catchError(this.handleError));
  }

  //rxjs uvjek vraca observable
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
