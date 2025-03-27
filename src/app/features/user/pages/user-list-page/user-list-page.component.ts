import { Component, inject, signal } from '@angular/core';
import { UserFacade } from '../../facades/user.facade';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { User } from '../../models/user.model';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-list-page',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ButtonComponent,
  ],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss',
})
export class UserListPageComponent {
  userFacade = inject(UserFacade);
  route = inject(ActivatedRoute);
  router = inject(Router);

  users = this.userFacade.filteredUsers;
  posts = this.userFacade.posts;
  loading = this.userFacade.loading;
  error = this.userFacade.error;
  searchTerm = this.userFacade.searchTerm;

  searchControl = new FormControl('');

  displayedColumns: string[] = ['name', 'email', 'website', 'posts', 'actions'];

  ngOnInit(): void {
    this.userFacade.loadUsers();
    this.userFacade.setupSearchFilter(this.route);

    const searchParam = this.route.snapshot.queryParams['search'];
    if (searchParam) {
      this.searchControl.setValue(searchParam, { emitEvent: false });
      this.userFacade.setSearchTerm(searchParam);
    }

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: searchTerm || null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });

        this.userFacade.setSearchTerm(searchTerm || '');
      });
  }

  navigateToDetails(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  openWebsite(url: string, event: Event): void {
    event.stopPropagation();
    window.open(`https://${url}`, '_blank');
  }

  getUserPosts(userId: number): string[] {
    return this.userFacade.posts()[userId] || [];
  }
}
