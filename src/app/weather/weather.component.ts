import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [NgIf, MapComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})


export class WeatherComponent implements OnChanges {

  // Déclaration d'une propriété d'entrée cityDataSecondChild, qui reçoit des données sur la ville venant du parent (cityDataParent)
  @Input() cityDataSecondChild: any;
  private apiKey = environment.apiKey;
  // Propriété pour stocker les données météorologiques récupérées
  protected weatherData: any = [];


  constructor(private http: HttpClient) { };

  // Méthode appelée lorsqu'il y a des changements dans la propriété d'entrée cityDataSecondChild
  ngOnChanges() {

    // Vérifie si la propriété cityDataSecondChild contient la valeur postalCode
    if (this.cityDataSecondChild.postalCode) {

      // Récupère le code postal de la ville depuis cityDataSecondChild et stockage dans une variable
      var postalCode = this.cityDataSecondChild.postalCode;

      this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${postalCode},fr&appid=${this.apiKey}`).subscribe((data: any) => {
        console.log('Weather data:', data);

        // récupération des données et stockage dans un tableau associatif pour les afficher dans le HTML
        this.weatherData = {

          cityName: data.name,
          country: data.sys.country,
          weather: data.weather[0].main,
          icon: data.weather[0].icon,
          // Convertit la température de Kelvin en Celsius et l'arrondit
          //apelle de la fonction 'convertKelvinToCelsius'
          temperature: Math.round(this.convertKelvinToCelsius(data.main.temp)) // La fonction Math.trunc() retourne la troncature entière d'un nombre en retirant sa partie décimale.

        };

        console.log(data.name);
        console.log(data.weather[0].main);
        console.log(data.weather[0].icon);
        console.log(data.sys.country);
        console.log(this.convertKelvinToCelsius(data.main.temp))

      });
    }

  }

  // fonction permettant de convertir en degres celcius
  // prend un seul paramètre appelé 'kelvin', qui doit être de type number, et retourne un nombre
  convertKelvinToCelsius(kelvin: number): number {

    return kelvin - 273.15;

  }

}



