import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CharactersService } from '../../pages/characters.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { 

  searchControl = new FormControl('');

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private charactersService = inject(CharactersService)

  mobileMenuOpen = false;
  profileDropdownOpen = false;
  searchTerm = '';

  @Output() search = new EventEmitter<string>();

  constructor() {
    // this.setupSearch();
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

}
