import ChallengeMutantApi from '../Http/ChallengeMutantApi';
import { User } from '../Types';

export default class UserServices {
  public async index(): Promise<User[]> {
    const challengeMutantApi: ChallengeMutantApi = new ChallengeMutantApi();

    const response = await challengeMutantApi.getUsers();

    const userList: User[] = Object.assign(response).filter((user: User) =>
      user.address.suite.toLowerCase().includes('suite'),
    );

    return userList.sort((a, b) => {
      const name = a.name.localeCompare(b.name);
      const email = a.email.localeCompare(b.email);
      const company = a.company.name.localeCompare(b.company.name);

      return name || email || company;
    });
  }
}
