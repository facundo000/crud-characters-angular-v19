import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Error404Component } from './shared/error-404/error-404.component';
import { DetailCharacterComponent } from './pages/detail-character/detail-character.component';
import { ListCharactersComponent } from './pages/list-characters/list-characters.component';
import { AddCharacterComponent } from './pages/add-character/add-character.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'personajes', pathMatch: 'full' },
    { path: 'personajes', component: ListCharactersComponent },
    { path: 'agregar-personaje', component: AddCharacterComponent },
    { path: 'editar/:id', component: DetailCharacterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: '404', component: Error404Component },
    { path: '**', redirectTo: '404' }
];
