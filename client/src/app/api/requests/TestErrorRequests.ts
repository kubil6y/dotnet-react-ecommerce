import { BaseRequests } from "./BaseRequests";

export class TestErrorRequests extends BaseRequests {
  public GetNotFound = () => {
    return this.Get("/buggy/not-found");
  };

  public GetBadRequest = () => {
    return this.Get("/buggy/bad-request");
  };

  public GetUnauthorized = () => {
    return this.Get("/buggy/unauthorized");
  };

  public GetValidationError = () => {
    return this.Get("/buggy/validation-error");
  };

  public GetServerError = () => {
    return this.Get("/buggy/server-error");
  };
}
