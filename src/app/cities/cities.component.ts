import { Component, Input} from '@angular/core';
import { WeatherComponent } from '../weather/weather.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [WeatherComponent, NgIf],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})


export class CitiesComponent {

  // propriété qui va récupérer les données du parent(cityDataParent), attention l'enfant récupère le meme type que la propriété parent
  // le type "any" est utilisé pour permettre à cette propriété de recevoir n'importe quel type de données 
  @Input() cityDataChild: any; 


}
