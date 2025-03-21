import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CharactersService } from '../../pages/characters.service';
import { LoginComponent } from "../../auth/login/login.component";
import { AuthzService } from '../../auth/authz.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { 

  searchControl = new FormControl('');

  isAuthenticated = false;
  user: any;
  
  private authSub: Subscription | null = null;
  private userSub: Subscription | null = null

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private charactersService = inject(CharactersService)
  public auth = inject(AuthzService)
  private cdr = inject(ChangeDetectorRef);

  mobileMenuOpen = false;
  profileDropdownOpen = false;
  searchTerm = '';

  @Output() search = new EventEmitter<string>();

  constructor() {
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleProfileDropdown(): void {
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  searchCharacter() {
    if (this.searchTerm.trim() !== '') {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: this.searchTerm },
          queryParamsHandling: 'merge'
        });
    } else {
      // Si el término está vacío, limpiar los parámetros de búsqueda
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: null },
        queryParamsHandling: 'merge'
      });
    }
  }
  ngOnInit() {
    // Suscribirse explícitamente al estado de autenticación
    this.authSub = this.auth.isAuthenticated().subscribe(auth => {
      // console.log('Estado de autenticación:', auth);
      this.isAuthenticated = auth;
      this.cdr.markForCheck();
    });
    
    // Suscribirse al usuario
    this.userSub = this.auth.getUser().subscribe(user => {
      // console.log('Datos del usuario:', user);
      this.user = user;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    // Limpiar suscripciones al destruir el componente
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
