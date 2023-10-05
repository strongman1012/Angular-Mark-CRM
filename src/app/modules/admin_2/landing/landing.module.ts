import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {LandingComponent} from './landing.component';

const routes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },

];

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
})
export class LandingModule {
}
