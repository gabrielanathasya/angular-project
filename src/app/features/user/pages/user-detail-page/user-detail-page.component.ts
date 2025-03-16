import { Component, inject } from '@angular/core';
import { UserFacade } from '../../facades/user.facade';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-detail-page',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    LoadingComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ButtonComponent,
  ],
  templateUrl: './user-detail-page.component.html',
  styleUrl: './user-detail-page.component.scss',
})
export class UserDetailPageComponent {
  userFacade = inject(UserFacade);
  route = inject(ActivatedRoute);
  router = inject(Router);

  selectedUser = this.userFacade.selectedUser;
  loading = this.userFacade.loading;
  error = this.userFacade.error;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.userFacade.loadUserById(userId);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  openWebsite(url: string): void {
    window.open(`https://${url}`, '_blank');
  }

  openGoogleMaps(lat: string, lng: string): void {
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  }
}
