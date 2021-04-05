import {HttpClient} from '@angular/common/http';
import {RoutesLoaderService} from './routes.loader.service';

export function routesExist(
  http: HttpClient,
  routeLoader: RoutesLoaderService) {
  return () => routeLoader.load().toPromise();
}
