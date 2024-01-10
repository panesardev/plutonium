import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { inject as injectAnalytics } from '@vercel/analytics';

injectAnalytics({ mode: 'auto' });

bootstrapApplication(AppComponent, appConfig);
