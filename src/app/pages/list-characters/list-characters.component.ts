import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Character } from '../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-characters',  
  imports: [CommonModule, RouterLink],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCharactersComponent { 

  character = signal<Character[] | undefined>([]);
  loading = signal<boolean>(false);
  currentSearchTerm = signal<string>('');
  
  public characters = computed( () => this.character());
  private route = inject(ActivatedRoute);
  

  constructor(private charactersService: CharactersService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if(searchTerm) {
        console.log('con filtro', this.currentSearchTerm())
        this.currentSearchTerm.set(searchTerm);
        this.searchCharacters(searchTerm);
      } else {
      this.charactersService.getAllCharacters().subscribe({
        next: (response) => {        
          this.character.set(response);
          console.log('Datos recibidos:', this.characters());
        },
          error: (err) => console.error('Error:', err)
        });
      }
    })
  }

  searchCharacters(searchTerm: string): void {
    this.loading.set(true);
    this.charactersService.getCharacterByName(searchTerm).subscribe({
      next: (response) => {
        if (response) {
          this.character.set([response]);
        } else {
          console.error('Received undefined character');
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error en la búsqueda');
        this.loading.set(false);
        console.error('Search error:', error);
      }
    });
  }
}
