import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMBdService } from './imbd.service';
import { movie } from './interface/movie';


@Component({
// selector = voir list.component.html
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [IMBdService]
})
export class ListComponent implements OnInit, OnDestroy {

  private sub$: Subscription;

  protected movies: movie[];
// appel du service
  constructor(private service: IMBdService) { }


  // pour récupérer les films
  ngOnInit(): void {
    this.service.getPopularMovies();
    this.sub$ = this.service.getObservable()
    .subscribe((data: movie[])=> this.movies = data)
  }

  ngOnDestroy(): void{
    this.sub$.unsubscribe();
  }

  // lié au imbd.service = suppression d'un film
  deleteMovie(title: string):void{
    this.service.deleteMovie(title);
  }
}
