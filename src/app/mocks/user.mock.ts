import { User } from '../features/user/models/user.model';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '1-770-736-8031 x56442',
    website: 'john.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: '40.7128',
        lng: '-74.0060',
      },
    },
    company: {
      name: 'ABC Corp',
      catchPhrase: 'Making the world better',
      bs: 'innovate',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '1-770-736-8031 x56443',
    website: 'jane.com',
    address: {
      street: 'Second St',
      suite: 'Apt 2',
      city: 'Boston',
      zipcode: '02108',
      geo: {
        lat: '42.3601',
        lng: '-71.0589',
      },
    },
    company: {
      name: 'XYZ Corp',
      catchPhrase: 'Excellence in everything',
      bs: 'grow',
    },
  },
];

export const mockSingleUser = mockUsers[0];
