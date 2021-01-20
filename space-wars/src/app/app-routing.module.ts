import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindFalconeComponent } from './features/find-falcone/find-falcone.component';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './features/search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    component: FindFalconeComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
