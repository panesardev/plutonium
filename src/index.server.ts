import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { serverConfig } from './server/app.config.server';

const bootstrap = (ctx: BootstrapContext) => bootstrapApplication(AppComponent, serverConfig, ctx);

export default bootstrap;
