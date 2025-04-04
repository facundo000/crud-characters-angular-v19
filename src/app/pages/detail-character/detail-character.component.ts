import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CharactersService } from '../characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../interfaces/character.interface';
import { switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail-character',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './detail-character.component.html',
  styleUrl: './detail-character.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCharacterComponent { 
  value = 'Clear me';

  // isEditMode:boolean = false;

  public characterForm = new FormGroup({
    // id: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    no: new FormControl<string>('', { nonNullable: true })
  })
  
  // this.isEditMode = !!this.characterId;

  private charactersService = inject(CharactersService)
  private readonly activatedRoute = inject(ActivatedRoute);
  public characterWasFound = signal(true);
  private router = inject(Router);

  public characterId =  signal(this.activatedRoute.params.pipe(
    tap(params => console.log('Params changed:', params)),
    switchMap(params => this.charactersService.getCharacterById(params['id']))
  ));

  // public character?: Character;
  character = signal<Character | undefined>(undefined);
  tempImage = signal<string>('');
  
  
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.charactersService.getCharacterById( id )),
      )
      .subscribe({
        next: (response) => {
          if (!response) {
            this.router.navigate(['/']);
            return;
          }
          this.character.set(response);
          // this.characterForm.reset(response)
          this.characterForm.patchValue({
            name: response?.name,
            no: response?.no
          });          
          console.log(response)
        },
        error: (err) => console.log('Error', err)

      })
  }
  onSubmit() {
    
    if(this.characterForm.valid){

      const id = this.activatedRoute.snapshot.params['id'];
        const formData = this.characterForm.getRawValue();

        console.log('Datos a guardar:', formData, id);

        this.charactersService.updateCharacter(id, formData).subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.handleError(err)
        })
    }
  }
  private handleSuccess(): void {
    // alert('Saved successfully');
    Swal.fire({
      title: "¡Actualizado!", 
      icon: "success",
      draggable: true
    });
    this.router.navigate(['/personajes']);
  }

  private handleError(err: any): void {
    console.error('Error:', err);   
  }

  loadImage() {
    const imageUrl = this.characterForm.get('no')?.value;
    if (imageUrl) {
      this.tempImage.set(imageUrl);
      console.log(this.tempImage.set(imageUrl))
    }
  }
  deleteCharacter(): void {
    const characterId = this.character()?._id;

    if (!characterId) {
      Swal.fire('Error', 'ID de personaje no válido', 'error');
      return;
    }

    Swal.fire({
      title: "¿Estas seguro de eliminarlo?",
      text: "No vas a poder revertir la acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.charactersService.deleteCharacter(characterId).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El personaje ha sido eliminado",
              icon: "success"
            });
            this.router.navigate(['/personajes']);
          },
          error: (err:any) => {
            Swal.fire({
              title: "¡Error!",
              text: `No se pudo eliminar, ${err}`,
              icon: "error"
            });
          }
        });
      }
    });
  }

}
