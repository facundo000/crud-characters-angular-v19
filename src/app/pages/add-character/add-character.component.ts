import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CharactersService } from '../characters.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-character',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './add-character.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class AddCharacterComponent {
  private charactersService = inject(CharactersService);
  private router = inject(Router);

  onSubmit(){
    this.saveCharacter()
  }

  clearForm() {
    this.characterForm.reset();
    this.tempImage.set('');
}
saveCharacter() {
  if(this.characterForm.valid){
    const formData = {
      ...this.characterForm.getRawValue(),
      no: this.tempImage()
    };
    console.log('Datos a guardar:', formData);
    this.charactersService.addCharacter(formData).subscribe({
      next: () => this.handleSuccess(),
      error: (err) => this.handleError(err)
    })
  }
} 
  public characterForm = new FormGroup({
      name: new FormControl<string>('', { nonNullable: true }),
      no: new FormControl<string>('', { nonNullable: true })
  })
  defaultImage = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';  
  tempImage = signal<string>('');

  loadImage() {
    const imageUrl = this.characterForm.get('no')?.value;
    if (imageUrl) {
      this.tempImage.set(imageUrl);
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
}
