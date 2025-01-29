import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'character',
  //   loadChildren: () =>
  //     import('./rickandmorty/rickandmorty.module').then((m) => m.RickandmortyModule),
  // },
  { path: '', redirectTo: 'character', pathMatch: 'full' },
  { path: '**', redirectTo: 'character' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
