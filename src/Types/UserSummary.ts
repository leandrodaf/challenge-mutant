import UserCompany from './UserCompany';

export default interface UserSummary {
  website: string;
  name: string;
  email: string;
  company: UserCompany;
}
