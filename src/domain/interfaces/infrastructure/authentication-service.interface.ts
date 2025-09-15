import { AuthenticationRecord } from "~/domain/records/authentication.record";

export abstract class AuthenticationServiceInterface {
    execute: () => Promise<AuthenticationRecord>;
}
