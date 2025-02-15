import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-characters',
  imports: [],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCharactersComponent { }
