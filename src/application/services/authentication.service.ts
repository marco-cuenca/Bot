import { inject, injectable } from "tsyringe";

import { AuthenticationRecord } from "~/domain/records/authentication.record";
import { AuthenticationServiceInterface } from "~/domain/interfaces/application/authentication-service.interface";
import { AuthenticationServiceInterface as AuthenticationInfrastructureInterface } from "~/domain/interfaces/infrastructure/authentication-service.interface";

@injectable()
export class AuthenticationService implements AuthenticationServiceInterface {
  constructor(
    @inject("AuthenticationServiceInfrastructureInterface")
    private readonly authenticationInterface: AuthenticationInfrastructureInterface
  ) {}

  public async execute(currentAuthentication?: AuthenticationRecord) {
    // if (currentAuthentication.issued_at) return currentAuthentication;
    return await this.authenticationInterface.execute();
  }
}
