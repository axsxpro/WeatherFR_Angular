import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Importation de la classe enfant pour envoyer les données du parent vers l'enfant
import { CitiesComponent } from './cities/cities.component';
import { MapComponent } from './map/map.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CitiesComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent {


  public field = new FormControl(); // variable qui récupère la valeur de l'input dans le formulaire
  public cityDataParent: any = []; // variable qui stock les données de l'api
  constructor(private http: HttpClient) { };


  public searchAddress() {

    // si le champs est vide
    if (this.field.value.trim() === '') {

      // Ne rien faire si le champ est vide
      return;

    }

    //utilisation du get pour récupérer les donées de l'api
    //concatenation de la valeur de l'input avec l'url de l'api
    return this.http.get('https://api-adresse.data.gouv.fr/search/?q=' + this.field.value).subscribe((data: any) => {

      // affichage des données dans la console, possibilité de stocké les données dans une variable
      console.log('City data :', data);

      // récupération des données et stockage dans un tableau associatif pour les afficher dans le HTML
      this.cityDataParent = {

        cityName: data.features[0].properties.city,
        postalCode: data.features[0].properties.postcode,
        coordinates: {
          longitude: data.features[0].geometry.coordinates[0],
          latitude: data.features[0].geometry.coordinates[1]
        }

      };

      console.log(data.features[0].properties.city);
      console.log(data.features[0].properties.postcode);
      console.log(data.features[0].geometry.coordinates[0]);
      console.log(data.features[0].geometry.coordinates[1]);

    });

  }

}
