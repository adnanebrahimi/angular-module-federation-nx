import { Component, OnInit } from '@angular/core';
import { Weather2Service } from '@cac-pos/weather2';

@Component({
  selector: 'cac-pos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public weatherService: Weather2Service) { }

  ngOnInit(): void {
  }
  updateClicked() {
    this.weatherService.updateWeatherStatus('Cold');
  }
}
