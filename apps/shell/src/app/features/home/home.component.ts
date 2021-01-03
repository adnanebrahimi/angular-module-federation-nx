import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@pos/weather';

@Component({
  selector: 'cac-pos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }
  updateClicked() {
    this.weatherService.updateWeatherStatus('Cold');
  }
}
