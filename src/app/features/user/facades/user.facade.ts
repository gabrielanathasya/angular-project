import { Injectable, inject, signal } from '@angular/core';
import { UserStore } from '../store/user.store';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  store = inject(UserStore);

  readonly users = this.store.users;
  readonly selectedUser = this.store.selectedUser;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly userCount = this.store.userCount;
  readonly searchTerm = this.store.searchTerm;
  readonly filteredUsers = this.store.filteredUsers;

  loadUsers(): void {
    this.store.loadUsers();
  }

  loadUserById(id: number): void {
    this.store.loadUserById(id);
  }

  setSearchTerm(term: string): void {
    this.store.setSearchTerm(term);
  }

  setupSearchFilter(route: ActivatedRoute): void {
    route.queryParams.subscribe((params) => {
      const search = params['search'] || '';
      this.setSearchTerm(search);
    });
  }
}
