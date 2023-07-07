import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from 'src/app/models/movie';
import { Paginator } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'rs-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  totalRecords: number = 0;
  rows: number = 0;

  @ViewChild('paginatorTop', { static: true }) paginatorTop!: Paginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom!: Paginator;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.searchValue = 'Hello';
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies.results;
      this.rows = Math.round(movies.total_results / movies.total_pages);
      if (movies.total_results <= 10000) {
        this.totalRecords = movies.total_results;
      } else {
        this.totalRecords = 10000;
      }
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies.results;
      this.rows = Math.round(movies.total_results / movies.total_pages);
      this.totalRecords = 10000; //movies.total_results;
    });
  }

  paginateTop(event: any): void {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
    this.paginatorBottom.changePage(event.page);
    this.paginatorBottom.alwaysShow = true;
  }

  paginateBottom(event: any): void {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
    this.paginatorTop.changePage(event.page);
    this.paginatorTop.alwaysShow = true;
  }

  paginate(event: any): void {
    this.getPagedMovies(event.page + 1);
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }

  clearFilter() {
    this.searchValue = '';
    this.getPagedMovies(1);
    this.paginatorTop.changePage(0);
    this.paginatorBottom.changePage(0);
  }
}
