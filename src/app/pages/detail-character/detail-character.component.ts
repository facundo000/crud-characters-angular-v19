import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-detail-character',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './detail-character.component.html',
  styleUrl: './detail-character.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCharacterComponent { 
  value = 'Clear me';
}
