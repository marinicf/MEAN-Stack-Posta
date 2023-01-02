import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostaService } from 'src/app/psota.service';
import { Ured } from 'src/app/ured.model';
import { UredService } from 'src/app/ured.service';


@Component({
  selector: 'app-posta-detail',
  templateUrl: './posta-detail.component.html',
  styleUrls: ['./posta-detail.component.css']
})
export class PostaDetailComponent implements OnInit {

  error = '';
  @Input() ured: any;
  oUred: Ured;
  rvUred;
  id: number;
  lat;
  lng;

  constructor(private uredService: UredService, private route: ActivatedRoute, private posta: PostaService) {

    this.posta.uredSelected.subscribe(
      (newUred: Ured) => {
        //this.oUred = newUred;
      }
    );
  }

  ngOnInit(){

    this.fetchUred()
  }

  fetchUred(){
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.uredService.dajUredPoPU(this.id).subscribe(
              (uredi: any) =>{
                this.oUred = uredi;
                this.lat = uredi.lat;
                this.lng = uredi.lng;
                //console.log(this.oUred)
              },
              (err) => {
                console.log(err)
                this.error = err.message;
              }
            );
            this.uredService.dajRvUreda(this.id).subscribe(
              (uredi: any) =>{
                this.rvUred = uredi;
                //console.log(this.rvUred)
              },
              (err) => {
                console.log(err)
                this.error = err.message;
              }
            );
      }
    );
  }

}
