import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Error404Component } from './shared/error-404/error-404.component';
import { DetailCharacterComponent } from './pages/detail-character/detail-character.component';
import { ListCharactersComponent } from './pages/list-characters/list-characters.component';
import { AddCharacterComponent } from './pages/add-character/add-character.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './auth/auth.guard';
import { CallbackComponent } from './pages/callback/callback.component';
import { publicGuard } from './auth/public.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'personajes', pathMatch: 'full' },
    { path: 'personajes', component: ListCharactersComponent },
    { path: 'agregar-personaje', component: AddCharacterComponent, canActivate: [authGuard] },
    { path: 'editar/:id', component: DetailCharacterComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
    { path: 'perfil', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'callback', component: CallbackComponent },
    { path: '404', component: Error404Component },
    { path: '**', redirectTo: '404' }
];
