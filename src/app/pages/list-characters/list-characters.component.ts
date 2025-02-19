import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Character } from '../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-characters',  
  imports: [CommonModule, RouterLink],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCharactersComponent { 

  character = signal<Character[] | undefined>(undefined);
  public characters = computed( () => this.character());
  

  constructor(private charactersService: CharactersService){}

  ngOnInit(): void {
    this.charactersService.getAllCharacters().subscribe({
      next: (response) => {        
        this.character.set(response);
        console.log('Datos recibidos:', this.characters());
      },
      error: (err) => console.error('Error:', err)
    });
  }

}
