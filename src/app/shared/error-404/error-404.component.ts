import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-404',
  imports: [],
  templateUrl: './error-404.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404Component { }
