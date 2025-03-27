import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/api/api.service';
import { User } from '../models/user.model';
import { endpoints } from '../../../core/api/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiService = inject(ApiService);

  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(endpoints.user.base);
  }

  getUserById(id: number): Observable<User> {
    return this.apiService.get<User>(endpoints.user.by_id(id));
  }

  getUserPosts(id: number): Observable<any> {
    return this.apiService.get<any>(endpoints.user.get_posts(id));
  }
}
