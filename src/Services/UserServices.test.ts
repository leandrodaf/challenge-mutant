import UserServices from './UserServices';
import ResponseGetUserChallengeMutantApi from '../../__mocks__/ResponseGetUserChallengeMutantApi';

const mockGetUsers = jest.fn();

jest.mock('../Http/ChallengeMutantApi', () => {
  return jest.fn().mockImplementation(() => {
    return { getUsers: mockGetUsers };
  });
});

test('Must not contain the word "suite" within the address', async () => {
  mockGetUsers.mockImplementation(() =>
    Promise.resolve(ResponseGetUserChallengeMutantApi),
  );

  const mockUserServices = new UserServices();

  mockUserServices.index().then(result => {
    result.forEach(user =>
      expect(user.address.suite).toEqual(expect.stringContaining('Suite 351')),
    );
  });
});

test('The information listing must be in alphabetical order in orderm (name, email, company)', () => {
  mockGetUsers.mockImplementation(() =>
    Promise.resolve(ResponseGetUserChallengeMutantApi),
  );

  const mockUserServices = new UserServices();

  const expected = [
    {
      address: {
        city: 'Roscoeview',
        geo: {
          lat: '-31.8129',
          lng: '62.5342',
        },
        street: 'Skiles Walks',
        suite: 'Suite 351',
        zipcode: '33263',
      },
      company: {
        bs: 'revolutionize end-to-end systems',
        catchPhrase: 'User-centric fault-tolerant solution',
        name: 'Keebler LLC',
      },
      email: 'Lucio_Hettinger@annie.ca',
      id: 5,
      name: 'Chelsey Dietrich',
      phone: '(254)954-1289',
      username: 'Kamren',
      website: 'demarco.info',
    },
  ];

  mockUserServices.index().then(result => expect(result).toEqual(expected));
});
