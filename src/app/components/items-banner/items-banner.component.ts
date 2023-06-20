import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'rs-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class MovieItemsBannerComponent {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
}
