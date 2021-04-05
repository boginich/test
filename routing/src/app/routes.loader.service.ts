import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {AboutComponent} from './about/about.component';
import {AboutExtraComponent} from './about-extra/about-extra.component';
import {PostsComponent} from './posts/posts.component';
import {PostComponent} from './post/post.component';

@Injectable({providedIn: 'root'})
export class RoutesLoaderService {

  constructor(
    private router: Router,
    private client: HttpClient) {
  }

  private apiRoutes = 'api/routes';

  public load() {
    return this.client.get<JSON>(this.apiRoutes)
      .pipe(switchMap(json => this.createRoutes(json)));
  }

  private createRoutes(json: any) {
    return from(json.routeSpecs).pipe(
      map(spec => this.toRoutes(spec)),
      map(routes => ([
        ...this.router.config,
        ...routes
      ])),
     // map(newRoutes => this.router.resetConfig(newRoutes))
    );
  }

  private toRoutes(entities) {
    return Object.keys(entities)
      .map(it => ([
        {
          path: `${entities[it].name}`, component: AboutComponent,
          children: [
            {path: `${entities[it].name}`, component: AboutExtraComponent}
          ]
        },
        {path: `${entities[it].name}`, component: PostsComponent},
        {path: `${entities[it].name}`, component: PostComponent}
      ]));
  }
}

