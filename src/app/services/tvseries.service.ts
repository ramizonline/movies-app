import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvDto } from '../models/tv';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvseriesService {

  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = '45a1ba0110e0970fd0ee1292426b88dd';

  constructor(private http: HttpClient) {}

  getTvs(type: string = 'popular', count: number = 12) {
    return this.http
      .get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }
}
