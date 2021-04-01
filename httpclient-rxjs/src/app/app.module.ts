import {NgModule, Provider} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from '../servicies/auth.interceptor';
import {LoggingInterceptor} from '../servicies/logging-interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
const LOGINTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoggingInterceptor,
  multi: true
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [INTERCEPTOR_PROVIDER, LOGINTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
