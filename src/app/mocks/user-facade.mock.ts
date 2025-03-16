import { signal } from '@angular/core';
import { mockUsers, mockSingleUser } from './user.mock';

export const createMockUserFacade = () => {
  return jasmine.createSpyObj(
    'UserFacade',
    ['loadUsers', 'loadUserById', 'setSearchTerm', 'setupSearchFilter'],
    {
      filteredUsers: signal([...mockUsers]),
      selectedUser: signal(mockSingleUser),
      loading: signal(false),
      error: signal(null),
      searchTerm: signal(''),
    }
  );
};
