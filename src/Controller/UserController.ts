import { BaseContext } from 'koa';
import UserServices from '../Services/UserServices';
import { userSummaryTransformer } from '../Transformer/UserSummaryTransformer';

export default class UserController {
  public static async index(ctx: BaseContext): Promise<void> {
    const userSummary = new UserServices().index();

    ctx.body = {
      success: true,
      user: await userSummaryTransformer(userSummary),
    };
  }
}
