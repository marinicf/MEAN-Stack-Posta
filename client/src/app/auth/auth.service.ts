import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { User } from "./user.model";

export interface AuthDataRes {
  user: {id:string, username:string};
  id?: string;
  token :string;
  success: boolean;
  msg? : string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  baseUrl = 'http://127.0.0.1:3001/';

  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null)

  login(username: string, password: string){
    return this.http.post<AuthDataRes>(this.baseUrl+'users/auth', {username: username, password: password})
      .pipe(catchError(this.handleError), tap(resData =>{
        //console.log(resData);
        if(resData.success){
          const user = new User(
            resData.user.username,
            resData.user.id,
            resData.token
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user))
        }
      }))
  }

  autoLogin(){
    const userData:{
      userId:string,
      username: string,
      _token: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.userId, userData.username, userData._token)
    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  private handleAuth(username: string, userId: string,token: string){
    const user = new User(
      username,
      userId,
      token
    );
    this.user.next(user);
  }
  private handleError(errorRes: HttpErrorResponse){
    let errMsg = "Error occurred";
    return throwError(errMsg);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

}
