import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { Ured } from 'src/app/ured.model';
import { UredService } from 'src/app/ured.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //injektirano ruter tj. bajndamo ga na private pravo pristupa
  constructor(private router: Router,private uredService: UredService) { }

  error = '';
  loadedUredi: Ured[] = [];
  searchText:number;

  ngOnInit(): void {
    //this.initAutocomplete();

  }

  onEnterSubmit(event, form){
    this.error =null;
    if(form.value.pu.toString().length == 5){
      this.uredService.dajUredPoPU(form.value.pu).subscribe(uredData =>{
        if(uredData){
          console.log(uredData);
        }else{
          this.error = 'Ured na postoji'
        }
      })
    }else{
      this.error = "Poštanski broj ureda mora ima 5 znamenaka!"
    }

  }
  initAutocomplete() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
      }
    );

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}
