import { EventEmitter, Injectable } from "@angular/core";
import { Ured } from "./ured.model";
import { UredService } from "./ured.service";

@Injectable({providedIn: 'root'})
export class PostaService{

  uredSelected = new EventEmitter<number>()
  constructor(private uredService: UredService){}
  /*
  getOneUred(uredId){
    return this.uredService.fetchOneUred(uredId).subscribe(
      (uredi: any) =>{
        this.ured = uredi;
        console.log(this.ured)
      },
      (err) => {
        console.log(err)
        this.error = err.message;
      }
    );
  }*/

  onUredSelected(){

  }

}
