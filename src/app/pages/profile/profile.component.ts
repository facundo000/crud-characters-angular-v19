import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthzService } from '../../auth/authz.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent { 
  constructor(public auth: AuthzService) {}
}
