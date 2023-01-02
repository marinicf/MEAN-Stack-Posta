import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  constructor() { }

  ngOnInit(){

  }
  map: google.maps.Map;
  @ViewChild('mapel', {static: false}) googlemaps;

  ngAfterViewInit() {
    //this.initializeMap();
    //this.initMap();
  }
  initializeMap(){
    const bounds = new google.maps.LatLngBounds();
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const center = {
    //   lat: position.coords.latitude,
    //   lng: position.coords.longitude,
    //   };
    //   this.googleMapService.currentLocation.next(center);
    //   this.addMarker(position.coords.latitude, position.coords.longitude);
    //   });

  }
  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 3,
        center: { lat: 0, lng: -180 },
        mapTypeId: "terrain",
      }
    );

    const flightPlanCoordinates = [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ];
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#0000FF",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    flightPath.setMap(map);
  }

}
