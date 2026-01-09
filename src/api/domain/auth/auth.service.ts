import AuthRepository from "./auth.repository";
import { LoginRequest, LoginResponse } from "./auth.types";

export default class AuthService {
  private readonly authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.authRepository.login(credentials);
    return response;
  }
}
