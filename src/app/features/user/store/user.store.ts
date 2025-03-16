import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '../models/user.model';
import { computed, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';

export type UserState = {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
};

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  searchTerm: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ users, searchTerm }) => ({
    userCount: computed(() => users().length),
    filteredUsers: computed(() => {
      const term = searchTerm().toLowerCase();
      if (!term) return users();

      return users().filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.username.toLowerCase().includes(term)
      );
    }),
  })),
  withMethods((store, userService = inject(UserService)) => ({
    loadUsers: rxMethod<void>(
      pipe(
        tap(() => {
          if (store.users().length > 0) {
            return;
          }
          patchState(store, { loading: true, error: null });
        }),
        switchMap(() => {
          if (store.users().length > 0) {
            return EMPTY;
          }

          return userService.getAllUsers().pipe(
            tap({
              next: (users) => patchState(store, { users, loading: false }),
              error: (error) =>
                patchState(store, { error: error.message, loading: false }),
            }),
            catchError(() => EMPTY)
          );
        })
      )
    ),

    loadUserById: rxMethod<number>(
      pipe(
        tap((userId) => {
          if (store.selectedUser()?.id === userId) {
            return;
          }

          const userInStore = store.users().find((user) => user.id === userId);
          if (userInStore) {
            patchState(store, { selectedUser: userInStore, error: null });
          } else {
            patchState(store, { loading: true, error: null });
          }
        }),
        switchMap((userId) => {
          const userInStore = store.users().find((user) => user.id === userId);

          if (store.selectedUser()?.id === userId || userInStore) {
            return EMPTY;
          }

          return userService.getUserById(userId).pipe(
            tap({
              next: (user) =>
                patchState(store, { selectedUser: user, loading: false }),
              error: (error) =>
                patchState(store, { error: error.message, loading: false }),
            }),
            catchError(() => EMPTY)
          );
        })
      )
    ),

    setSearchTerm: (term: string) => {
      patchState(store, { searchTerm: term });
    },
  })),
  withHooks({
    onInit: (store) => {
      store.loadUsers();
    },
  })
);
