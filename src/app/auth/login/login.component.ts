import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthzService } from '../authz.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
constructor(public auth: AuthzService) {}

}
