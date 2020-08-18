import HttpClient from './HttpClient';
import { User } from '../Types';

export default class ChallengeMutantApi extends HttpClient {
  public constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  public getUsers = () => this.instance.get<User[]>('/users');
}
