import { Component, OnInit } from '@angular/core';
import { Ured } from 'src/app/ured.model';
import { UredService } from 'src/app/ured.service';
import { Grad } from '../../grad.modal'
import { Coord } from './coord.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  prikaziMapu:boolean = false;
  spinner: boolean = false;
  loadedUredi:Ured[]
  loadedUrediCopy:Ured[]
  coordinate = [];
  rjesenjeIds: [number];
  globalUdaljenst: number ;
  error: string;
  searchText
  put = false;
  selectedDevice
  selected:{};
  newCord:{lat:number,lng:number};
  flightPlanCoordinates: any =[];
  counter:string;

  lat = 45.815399;
  long = 15.966568;
  zoom = 7;

  allowBtnClick = true;

  constructor(private uredService: UredService) {}

  odabraniGradovi:Grad[] = [];

  ngOnInit(): void {
    this.uredService.dajUredeNode().subscribe(
      (uredi: Ured[]) =>{
        this.loadedUrediCopy = uredi
        this.loadedUredi = this.loadedUrediCopy.slice();
        console.log(this.loadedUredi);

      },
      (err) => {
        console.log(err)
        this.error = err.message;
      }
    );

  }

  onChange(event){
    let uredId = this.selectedDevice=event;
    //console.log(uredId);

    let selectedUred: Grad;
    //console.log(this.selectedDevice);
    this.loadedUredi.forEach(element => {

      if(element.pu == uredId){
        selectedUred = new Grad(
          element.ulica +' '+ element.mjesto,
          element.pu,
          element.lat,
          element.lng
        )
      }
    });
    this.odabraniGradovi.push(selectedUred)
    //console.log(this.odabraniGradovi);
  }
  onDelete(uredID){
    for(let i = 0; i < this.odabraniGradovi.length; i++){
      if(this.odabraniGradovi[i].id == uredID){
        this.odabraniGradovi.splice(i,1);
      }
    }
  }

  onPronadiPutClick(){
    this.coordinate =  []
    this.spinner = true;
    let counter = 1;
    if(this.odabraniGradovi.length > 1){

      let cvorovi = this.odabraniGradovi.slice()
      let polaziste: Grad = cvorovi.shift();
      console.log('Polazište ' + polaziste.id );
      console.log('odabrani gradovi' + cvorovi);

      [this.rjesenjeIds, this.globalUdaljenst] = this.nadiNajkraciPut(cvorovi, polaziste)
      this.rjesenjeIds.forEach(element => {
        this.counter = counter++ +''
        this.coordinate.push(this.dajLatLng(element))
      });
      console.log(this.coordinate);
      this.spinner = false;
      this.put = true;
      this.rjesenjeIds.splice(0, this.rjesenjeIds.length)

    }else{
      alert('Odaberite urede za dostavu');
      this.spinner = false
    }

  }

  dajLatLng(uredID){
    let cord: Coord;
    this.loadedUredi.forEach(element => {
      if(element.pu ==uredID){
        cord = new Coord(element.ulica, element.pu, element.lat, element.lng, element.mjesto);
        cord.print_key()
        cord.counter = this.counter;
      }
    });
    return cord;
  }

  nadiNajkraciPut(cvorovi:Grad[], polaziste:Grad){
    let globalMin:number = Infinity;
    let rjesenje = [polaziste.id];
    let counter = 1;
    let finalUdalj: any;

    cvorovi.forEach((c, index) => {
      //let cvorovi = cvorovi2;
      //Udaljenos od polazišta do trenutnog čvora
      let rjesenjeKandidat = [polaziste.id];
      //console.log(rjesenje.length + " " + rjesenjeKandidat);

      //console.log('Grad: ' + c.id + c.name);
      let udaljenost: number = this.getDistanceFromLatLonInKm(c.lat,c.lon,polaziste.lat,polaziste.lon);
      //console.log('Udaljenost foreach: ' + udaljenost);
      //Ne posječeni čvorovi
      //let unvisited: Grad[] = cvorovi.slice().splice(index)
      let unvisited: Grad[] = cvorovi.slice();

      //for(let i = 0; i < unvisited.length; i++){
      //  console.log(unvisited[i].id);
      //}

     //console.log(unvisited.length);

      //console.log( counter+'.put: index= '+index+' c= '+ c.id+' unvisited: '+ unvisited );

      let minIndex: number = index;
      let minIndexGrad: number =index;

      //petlja se izvodi dok se ne posjete svi nodovi
      while(unvisited.length > 0){

        //console.log("Na pocetku while: " + cvorovi[minIndexGrad].id)
        let min: number = Infinity;
        for(let i = 0; i < unvisited.length; i++){
          console.log( 'Index: ' + i);
          //if(i != minIndex){

           let udalj: number = this.getDistanceFromLatLonInKm(cvorovi[minIndexGrad].lat, cvorovi[minIndexGrad].lon, unvisited[i].lat, unvisited[i].lon)
          // if(this.getDistanceFromLatLonInKm(c.lat,c.lon,unvisited[i].lat,unvisited[i].lon) < min){
           //console.log("racun udalj:" + cvorovi[minIndexGrad].id + " " + unvisited[i].id + " " + udalj);

           if( udalj < min){
             min = udalj;
             console.log( 'Index: '+ i + " minUdaljenost: " + Math.round(min));
             minIndex = i;
             //console.log("Unutar if uvjeta" + cvorovi[minIndexGrad].id, unvisited[minIndex].id)
           }
          //}
        }

        //console.log("Treba obrisati grad:" + unvisited[minIndex].id);
        for(let i = 0; i < cvorovi.length; i++){
          if(cvorovi[i].id == unvisited[minIndex].id ){
            //console.log("Zadrzi grad:" + cvorovi[i].id);
            minIndexGrad = i;
            //console.log("Zadrzi grad minIndexGrad:" + cvorovi[minIndexGrad].id + " " + minIndexGrad);
          }
        }

        udaljenost += min;
        //console.log('Udaljenost u petlji unvisited: '+ udaljenost);
        rjesenjeKandidat.push(unvisited[minIndex].id)
        //console.log('unvisited nakon splice(): '+ unvisited.splice(minIndex))
        unvisited.splice(minIndex, 1)
        //console.log(unvisited.length + "cvorovi: " + cvorovi.length)

        //console.log('unvisited nakon delete:' + unvisited)
        //console.log("Zadrzi grad - kraj while:" + cvorovi[minIndexGrad].id);

      }
      console.log('Kandidat za rješenje: ' + rjesenjeKandidat);

      console.log('Udaljenost: '+ udaljenost);
      console.log('Global min: ' + globalMin);

      if(udaljenost < globalMin){
        globalMin = udaljenost;
        rjesenje = rjesenjeKandidat;
      }
      counter++;
    });
    console.log('global_min: '+ globalMin);
    console.log('rjesenje: '+ rjesenje);
    finalUdalj = globalMin.toFixed(2);
    return [rjesenje, finalUdalj];
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
