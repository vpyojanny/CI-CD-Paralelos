import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then( m => m.PlayersPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./pages/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'add-player',
    loadChildren: () => import('./pages/add-player/add-player.module').then( m => m.AddPlayerPageModule)
  },
  {
    path: 'add-team',
    loadChildren: () => import('./pages/add-team/add-team.module').then( m => m.AddTeamPageModule)
  },
  {
    path: 'image-search',
    loadChildren: () => import('./image-search/image-search.module').then( m => m.ImageSearchPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
