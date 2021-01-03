import { Component, OnInit } from '@angular/core';
import { Weather2Service } from '@cac-pos/weather2';

@Component({
  selector: 'two-home-two',
  templateUrl: './home-two.component.html',
  styleUrls: ['./home-two.component.css']
})
export class HomeTwoComponent implements OnInit {

  constructor(public weatherService: Weather2Service) { }

  ngOnInit(): void {
  }

}
