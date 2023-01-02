import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostaService } from 'src/app/psota.service';
import { Ured } from 'src/app/ured.model';
import { UredService } from 'src/app/ured.service';

@Component({
  selector: 'app-posta-item',
  templateUrl: './posta-item.component.html',
  styleUrls: ['./posta-item.component.css']
})
export class PostaItemComponent implements OnInit, OnChanges {

  constructor(private uredService: UredService, private postaService: PostaService) { }

  error = '';
  uredEl : Ured
  @Input() ured: Ured;
  @Input() index: number;

  ngOnInit(){
  }
  ngOnChanges(){

  }

  // onSelected(id: number){

  //   this.postaService.uredSelected.emit(id)
  //   this.uredService.fetchOneUred(id).subscribe(
  //     (uredi: any) =>{
  //       this.uredEl = uredi;
  //       this.postaService.uredSelected.emit(this.uredEl[0].id)
  //       console.log(this.uredEl)
  //     },
  //     (err) => {
  //       console.log(err)
  //       this.error = err.message;
  //     }
  //   );

  // }

}
