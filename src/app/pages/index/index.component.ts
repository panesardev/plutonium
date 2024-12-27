import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedComponent } from './components/featured.component';

@Component({
  selector: 'app-index',
  imports: [
    RouterLink,
    FeaturedComponent,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IndexComponent {

}
