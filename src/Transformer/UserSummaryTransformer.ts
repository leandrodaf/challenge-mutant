import { User, UserSummary } from '../Types';

const userSummaryTransformer = async (userPromise: Promise<User[]>) => {
  const usersSummary: Promise<UserSummary[]> = userPromise.then(users =>
    users.map((user: User) => ({
      website: user.website,
      name: user.name,
      email: user.email,
      company: user.company,
    })),
  );

  return usersSummary;
};

export { userSummaryTransformer };
