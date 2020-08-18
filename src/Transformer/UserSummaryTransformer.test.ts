import { userSummaryTransformer } from './UserSummaryTransformer';
import { User, UserSummary } from '../Types';

test('Should return the expected value', () => {
  const user: User = {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    address: {
      street: 'Skiles Walks',
      suite: 'Suite 351',
      city: 'Roscoeview',
      zipcode: '33263',
      geo: {
        lat: '-31.8129',
        lng: '62.5342',
      },
    },
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: {
      name: 'Keebler LLC',
      catchPhrase: 'User-centric fault-tolerant solution',
      bs: 'revolutionize end-to-end systems',
    },
  };

  const expected = [
    {
      company: {
        bs: 'revolutionize end-to-end systems',
        catchPhrase: 'User-centric fault-tolerant solution',
        name: 'Keebler LLC',
      },
      email: 'Lucio_Hettinger@annie.ca',
      name: 'Chelsey Dietrich',
      website: 'demarco.info',
    },
  ];

  userSummaryTransformer(Promise.resolve([user])).then(result =>
    expect(result).toEqual(expected),
  );
});
