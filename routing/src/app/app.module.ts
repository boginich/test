import {HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {AboutExtraComponent} from './about-extra/about-extra.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {PostsComponent} from './posts/posts.component';
import {AppRoutingModule} from './app-routing.module';
import {RoutesLoaderService} from './routes.loader.service';
import {routesExist} from './route.exist';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AboutExtraComponent,
    HomeComponent,
    PostComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      {dataEncapsulation: false}
    )
  ],
  providers: [
    /*{
      provide: APP_INITIALIZER,
      useFactory: routesExist,
      multi: true,
      deps: [HttpClient, RoutesLoaderService],
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
