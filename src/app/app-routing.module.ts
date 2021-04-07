import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
{path:'',redirectTo:'home',pathMatch:'full'},
{ path: 'register', loadChildren: () => import('./components/pages/register/register.module').then(m => m.RegisterModule) },
{ path: 'login', loadChildren: () => import('./components/pages/login/login.module').then(m => m.LoginModule) }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
