import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weather$ = new BehaviorSubject<string>('Warm');
  constructor() { }
  updateWeatherStatus(weather: string) {
    this.weather$.next(weather);
  }
  get weather() {
    return this.weather$;
  }
}
