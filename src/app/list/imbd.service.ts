import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IMBdService {

  constructor(private http: HttpClient) { }
  getMovies(){
    // accès à l'API
    return this.http.get ('https://imdb-api.com/en/API/SearchMovie/k_du6rlvy1/inception%202010').toPromise()
  }
}
