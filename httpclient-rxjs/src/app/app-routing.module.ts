import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthInterceptor} from '../servicies/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {providerDef} from '@angular/compiler/src/view_compiler/provider_compiler';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
