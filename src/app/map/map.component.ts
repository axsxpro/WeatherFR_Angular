import { Component, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})


export class MapComponent implements OnChanges {

  //récupération des données du parent par une entrée (propriété de type any pour recevoir n'importe quel type de propriété)
  @Input() cityDataMap: any;

  //initialisation de la map
  public map: any;

  
  // Créer une carte initiale
  ngOnInit(): void {

    const longitude = 0; // initialisation de la longitude
    const latitude = 0; // initialisation de la latitude

     // Créer une nouvelle carte Leaflet avec les coordonnées extraites
     // 1 : niveau de zoom, va afficher la carte du monde
    this.map = L.map('map').setView([latitude, longitude], 1); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

  }


  // Méthode appelée lorsqu'il y a des changements dans la propriété d'entrée cityDataMap
  ngOnChanges(){

    // s'il n' y pas de données envoyés dans la propriété d'entré ou s'il n'y a pas de données (latitude/longitude) alors ne rien faire
    if (!this.cityDataMap || !this.cityDataMap.coordinates) {
      return;
    }

    // Supprimer la carte existante s'il y en a une à chaque apelle de la methode ngOnChanges
    if (this.map) {
      this.map.remove();
    }

    // systhème de destructuration
    //const { longitude, latitude } = this.cityDataMap.coordinates; 
    const longitude = this.cityDataMap.coordinates.longitude; // récupération de la longitude
    const latitude = this.cityDataMap.coordinates.latitude; // récupération de la latitude

     // Créer une nouvelle carte Leaflet avec les coordonnées extraites
     // 13 : niveau de zoom
    this.map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Ajouter un marqueur à la position de la ville sur la carte
    L.marker([latitude, longitude]).addTo(this.map)
      .bindPopup(this.cityDataMap.cityName); // le pop up contiendra le nom de la ville dans les données

  }


}
