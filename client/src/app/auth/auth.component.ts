import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  public username: string;
  public password: string;
  public error: string = null;
  constructor(private auth: AuthService, private router: Router) { }
  onSwitchMOde(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;
    this.auth.login(username, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        if(resData.success){
          this.router.navigate(['/map']);
        }else{
          this.error = 'Ne ispravno korisničko ime ili lozinka!'
        }
      },
      errorRes => {
        console.log(errorRes);
        this.error = errorRes;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
