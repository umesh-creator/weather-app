import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators";

interface keyable {
  [key: string]: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  city = 'Delhi';
  cityName = ''
  country = '';
  humidity = 94;
  pressure = 1006;
  temp = 0;
  temp_max = 0;
  feels_like = 0;
  temp_min = 0;
  windSpeed = 100;
  weather = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  onCheck() {
    this.fetchData();
  }

  fetchData() {
    this.http.get(
      'https://community-open-weather-map.p.rapidapi.com/find',
      {
        headers: {
          ['x-rapidapi-host']: 'community-open-weather-map.p.rapidapi.com',
          ['x-rapidapi-key']: 'd8090352e6msh336817927c0ec02p1de27ajsn9eb8f48f4160',
        },
        params: {
          ['q']: this.city,
          ['cnt']: '1',
          ['mode']: 'null',
          ['type']: 'link, accurate',
          ['units']: 'imperial, metric'
        }
      }
    )
      .pipe(map((resData: keyable) => {
        return resData.list[0]
      }))
      .subscribe((data) => {
        this.cityName = data.name;
        this.weather = data.weather[0].description;
        this.country = data.sys.country;
        this.temp = data.main.temp;
        this.humidity = data.main.humidity;
        this.temp_max = data.main.temp_max;
        this.temp_min = data.main.temp_min;
        this.pressure = data.main.pressure;
        this.feels_like = data.main.feels_like;
        this.windSpeed = data.wind.speed;
      });
  }
}
