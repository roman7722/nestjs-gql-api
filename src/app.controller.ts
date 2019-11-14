import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ITokens } from './token/token.types';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req: any) {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const fingerprint: string = req.body.fingerprint;
    return await this.authService.validateUser(username, password, fingerprint);
  }

  @Post('refresh')
  async refresh(@Request() req: any): Promise<ITokens> {
    const refreshToken: string = req.body.refreshToken;
    const fingerprint: string = req.body.fingerprint;
    return await this.authService.regenerateRefreshToken(
      refreshToken,
      fingerprint,
    );
  }
}
