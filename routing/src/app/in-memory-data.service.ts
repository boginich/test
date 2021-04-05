import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    /*const routes = [
      {
        path: 'about', component: 'AboutComponent',
        children: [
          {path: 'extra', component: 'AboutExtraComponent'}
        ]
      },
      {path: 'posts', component: 'PostsComponent'},
      {path: 'posts/:id', component: 'PostComponent'},
    ];*/
    const routes = [
      {
        path: 'about',
        children: [
          {path: 'extra'}
        ]
      },
      {path: 'posts'},
      {path: 'posts/:id'},
    ];
    return {routes};
  }
}
