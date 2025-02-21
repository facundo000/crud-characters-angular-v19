import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-character',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './add-character.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCharacterComponent { 
  public characterForm = new FormGroup({
      name: new FormControl<string>('', { nonNullable: true }),
      no: new FormControl<string>('', { nonNullable: true })
  })
  defaultImage = '/assets/noImage.png';  
  tempImage = signal<string>('');

  loadImage() {
    const imageUrl = this.characterForm.get('no')?.value;
    if (imageUrl) {
      this.tempImage.set(imageUrl);
    }
  }
}
