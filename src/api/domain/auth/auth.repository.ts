import { HttpService } from "../../baseRepositories/api/http/axios/axios-http-service";
import ApiRepository from "../../baseRepositories/api/respository";
import { RequestData } from "../../http/Http";
import { LoginRequest, LoginResponse } from "./auth.types";

export default class AuthRepository extends ApiRepository {
  constructor() {
    super("auth");
  }

  public async login(credentials: LoginRequest): Promise<LoginResponse> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/login`,
      body: credentials,
    };

    return HttpService.postAsync(data);
  }
}
