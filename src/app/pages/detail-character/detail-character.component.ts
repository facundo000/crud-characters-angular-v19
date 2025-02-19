import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { CharactersService } from '../characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../interfaces/character.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-detail-character',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './detail-character.component.html',
  styleUrl: './detail-character.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCharacterComponent { 
  value = 'Clear me';

  public characterForm = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    no: new FormControl<string>('', { nonNullable: true })
  })

  private charactersService = inject(CharactersService)
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  public characterWasFound = signal(true);

  public characterId =  signal(this.activatedRoute.params.pipe(
    tap(params => console.log('Params changed:', params)),
    switchMap(params => this.charactersService.getCharacterById(params['id']))
  ));

  // public character?: Character;
  character = signal<Character | undefined>(undefined);
  
  
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.charactersService.getCharacterById( id )),
      )
      .subscribe({
        next: (response) => {
          this.character.set(response);
          this.characterForm.reset(response)
          console.log(response)
        },
        error: (err) => console.log('Error', err)

      })
  }

}
