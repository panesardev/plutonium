import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toLazySignal } from 'ngxtension/to-lazy-signal';
import { FeaturedArticleComponent } from '../../components/featured-article.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FeaturedArticleComponent,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndexComponent {

  private auth = inject(AuthService);

  user = toLazySignal(this.auth.user$);

}
