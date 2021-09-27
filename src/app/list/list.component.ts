import { Component, OnInit } from '@angular/core';
import { IMBdService } from './imbd.service';
import { movie } from './interface/movie';

interface Idata {
  searchType: string,
  expression: string,
  results: Iresult[]
}

interface Iresult {
  id: string,
  resultType: string,
  image: string,
  title: string,
  description: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [IMBdService]
})
export class ListComponent implements OnInit {

  movies;

  constructor(private Service: IMBdService) { }


  ngOnInit() {
    this.Service.getMovies().then((data: Idata) => {
      this.movies = data.results
    })
  }

}
