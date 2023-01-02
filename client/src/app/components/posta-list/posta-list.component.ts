import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Ured } from 'src/app/ured.model';
import { UredService } from 'src/app/ured.service';


@Component({
  selector: 'app-posta-list',
  templateUrl: './posta-list.component.html',
  styleUrls: ['./posta-list.component.css']
})
export class PostaListComponent implements OnInit {

  error = '';
  isFetching = false;
  loadedUredi: any = [];
  pu: number
  ured:any

  searchText: string;

  constructor(private uredService: UredService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.uredService.dajUredeNode().subscribe(
      (uredi: Ured[]) =>{
        this.isFetching = false;
        this.loadedUredi = uredi;
        //console.log(this.loadedUredi);
      },
      (err) => {
        console.log(err)
        this.error = err.message;
      }
    );
  }
}
