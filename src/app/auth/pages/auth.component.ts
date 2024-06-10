import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginFormComponent } from '../components/login-form.component';
import { SocialLoginComponent } from '../components/social-login.component';
import { CreateAccountFormComponent } from '../components/create-account-form.component';

@Component({
  selector: 'auth',
  standalone: true,
  providers: [AuthService],
  imports: [
    LoginFormComponent,
    CreateAccountFormComponent,
    SocialLoginComponent,
  ],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthComponent {

}
