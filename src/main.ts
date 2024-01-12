import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

injectAnalytics({ mode: 'auto' });
injectSpeedInsights({ debug: true });

bootstrapApplication(AppComponent, appConfig);
