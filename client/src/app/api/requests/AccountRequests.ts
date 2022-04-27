import { BaseRequests } from "./BaseRequests";

export class AccountRequests extends BaseRequests {
  // TODO ILoginDto
  public Login = (body: any) => {
    return this.Post("/account/login", body);
  };

  public Register = (body: any) => {
    return this.Post("/account/register", body);
  };

  public GetCurrentUser = () => {
    return this.Get("/account/currentUser");
  };
}
