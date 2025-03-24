import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthzService } from '../../auth/authz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private router = inject(Router);
  constructor(
    public auth: AuthzService,
    //private dialog: MatDialog // Optional: for opening edit profile dialog
  ) {}

  openEditProfile() {
    // Optional: Open a dialog or navigate to edit profile page
    // Example with Angular Material Dialog:
    // const dialogRef = this.dialog.open(EditProfileDialogComponent, {
    //   width: '450px',
    //   data: this.auth.getCurrentUser()
    // });
    
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Handle profile update
    //   }
    // });

    // Or simple navigation:
    // this.router.navigate(['/editar-perfil']);
  }
}
