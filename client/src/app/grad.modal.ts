export class Grad{
  name?: String;
  id: any;
  lat: number;
  lon: number;
  // The static property
  static lastKey = 0;
  key?: number;

  constructor(name:String, id:any,  lat: number, lon: number){
    this.name = name,
    this.id = id;
    this.lat = lat;
    this.lon = lon;
    //this.key = ++Grad.lastKey;
  }

}

