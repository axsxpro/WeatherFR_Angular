import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Importation de la classe enfant pour envoyer les données du parent vers l'enfant
import { CitiesComponent } from './cities/cities.component';
import { MapComponent } from './map/map.component';
import { NgFor, NgIf } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CitiesComponent, MapComponent, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent {
  public field = new FormControl(); // variable qui récupère la valeur de l'input dans le formulaire
  public cityDataParent: any = []; // variable qui stocke les données de l'api
  public suggestions: any = [];
  public suggestionSelected: boolean = false; // Indicateur pour vérifier si une suggestion a été sélectionnée

  constructor(private http: HttpClient) {
    // Écouter les changements dans le champ de texte avec un délai de 300ms
    this.field.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.getSuggestions();
    });
  }

  // Fonction pour obtenir les suggestions à chaque frappe sur le clavier
  public getSuggestions() {

    if (this.field.value.trim() === '' || this.suggestionSelected) {

      this.suggestions = [];
      this.suggestionSelected = false
      return;

    }

    // Appel à l'API pour obtenir les suggestions
    this.http.get('https://api-adresse.data.gouv.fr/search/?q=' + this.field.value).subscribe((data: any) => {
      // Stockage des suggestions
      this.suggestions = data.features.map((feature: any) => ({
        cityName: feature.properties.city,
        postalCode: feature.properties.postcode,
        region: feature.properties.context
      }));
    });

  }


 // Fonction pour sélectionner une suggestion et mettre à jour le champ d'entrée
  public selectSuggestion(suggestion: any) {

    this.suggestionSelected = true; // Définir l'indicateur de sélection de suggestion sur vrai
    this.field.setValue(suggestion.postalCode); // Mettre à jour le champ d'entrée avec le code postal de la suggestion
    
  }


  // méthode pour effectuer la recherche d'adresse lorsque le bouton de recherche est cliqué
  public searchAddress() {

    // Si le champ est vide ou une suggestion a été sélectionnée, ne rien faire
    if (this.field.value.trim() === '' || this.suggestionSelected) {
      return;
    }

    // Utilisation du get pour récupérer les données de l'API
    this.http.get('https://api-adresse.data.gouv.fr/search/?q=' + this.field.value).subscribe((data: any) => {
      // Stockage des données de la ville
      this.cityDataParent = {
        cityName: data.features[0].properties.city,
        postalCode: data.features[0].properties.postcode,
        coordinates: {
          longitude: data.features[0].geometry.coordinates[0],
          latitude: data.features[0].geometry.coordinates[1]
        }
      };

      // Réinitialisation des suggestions après la recherche
      this.suggestions = [];
    });
  }


}
