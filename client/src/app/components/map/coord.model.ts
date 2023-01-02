export class Coord{

  ulica: String;
  id: any;
  lat: number;
  lng: number;
  mjesto: string
  counter?: string;

  // The static property
  static lastKey = 0;
  key?: string;
  constructor(ulica:String, id:any,  lat: number, lng: number, mjesto:string){
    this.ulica = ulica,
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.mjesto = mjesto
    this.key = ++Coord.lastKey+'';
  }
  print_key() {
    return this.key;
  }
  resetKey(){
    this.key = 0+'';
  }

}
