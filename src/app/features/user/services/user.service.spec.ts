import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiService } from '../../../core/api/api.service';

describe('UserService', () => {
  let service: UserService;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UserService,
        { provide: ApiService, useValue: mockApiService },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
