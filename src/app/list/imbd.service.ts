import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { movie } from './interface/movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IMBdService {

  private subject$: BehaviorSubject<movie[]>;
  private movie: movie[];

  constructor(private http: HttpClient) {
    this.subject$ = new BehaviorSubject([]);
  }

  public getObservable(){
    return this.subject$.asObservable();
  }
  public getPopularMovies(): Subscription {
    return this.http.get<movie[]> (`https://imdb-api.com/en/API/Top250Movies/k_1ms2tae8`)
    .pipe(map((data: any)=> data.items))
    .subscribe((data: movie[])=> {
      this.subject$.next(data);
      this.movie = data;
    });
  }

  public getMovieByName(name: string){
    return this.http.get('https://imdb-api.com/en/API/Top250Movies/k_1ms2tae8')
    .pipe(map((data: any)=> data.results))
  }

  // compare les titre et supprime et remet à jour la vue
  public deleteMovie(title: string){
    this.movie.map((m, i)=> {
      if (m.title === title) {
        this.movie.splice(i, 1);
      }
      this.subject$.next(this.movie);
    })
  }

}
