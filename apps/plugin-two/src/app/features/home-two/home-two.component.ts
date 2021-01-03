import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@cac-pos/weather';

@Component({
  selector: 'two-home-two',
  templateUrl: './home-two.component.html',
  styleUrls: ['./home-two.component.css']
})
export class HomeTwoComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
