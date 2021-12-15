import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrangchuComponent} from './trangchu/trangchu.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {TestComponent} from './test/test.component';
import {LocalStorageComponent} from './local-storage/local-storage.component';

const routes: Routes = [

  {
    path: 'trang-chu',
    component: TrangchuComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'toi-test',
    component: TestComponent
  },
  {
    path: 'localStorage',
    component: LocalStorageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
