import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from 'src/app/models/movie';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'rs-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  totalRecords: number = 0;
  rows: number = 0;
  @ViewChild('paginatorTop', { static: true }) paginatorTop!: Paginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom!: Paginator;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedMovies(1);
  }

  getPagedMovies(page: number) {
    this.moviesService.searchMovies(page).subscribe((movies) => {
      this.movies = movies.results;
      this.rows = Math.round(movies.total_results / movies.total_pages);
      this.totalRecords = 10000; //movies.total_results;
    });
  }

  paginateTop(event: any): void {
    // this.paginatorTop.changePage(event.page);
    this.getPagedMovies(event.page + 1);
    this.paginatorBottom.changePage(event.page);
    this.paginatorBottom.alwaysShow = true;
    //this.getPagedMovies(event.page + 1);
  }

  paginateBottom(event: any): void {
    // this.paginatorTop.changePage(event.page);
    this.getPagedMovies(event.page + 1);
    this.paginatorTop.changePage(event.page);
    this.paginatorTop.alwaysShow = true;
  }
}
