import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { WelcomePage } from './welcome/welcome.page';

const routes: Routes = [
  {
     path: '',
     component: WelcomePage
  },
  {
    path: 'login',
    component: LoginPage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
