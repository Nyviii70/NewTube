import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMBdService } from './imbd.service';
import { movie } from './interface/movie';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [IMBdService]
})
export class ListComponent implements OnInit, OnDestroy {

  private sub$: Subscription;

  protected movies: movie[];
  constructor(private service: IMBdService) { }


  ngOnInit(): void {
    this.service.getPopularMovies();
    this.sub$ = this.service.getObservable()
    .subscribe((data: movie[])=> this.movies = data)
  }

  ngOnDestroy(): void{
    this.sub$.unsubscribe();
  }

  // lié au imbd.service
  deleteMovie(title: string):void{
    this.service.deleteMovie(title);
  }
}
