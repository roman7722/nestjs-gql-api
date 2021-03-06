import { Controller, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ISessions } from './session/session.types';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Post('api/login')
  async login(@Request() req: any) {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const fingerprint: string = req.body.fingerprint;
    return await this.authService.validateUser(username, password, fingerprint);
  }

  @Post('api/refresh')
  async refresh(@Request() req: any): Promise<ISessions> {
    const refreshToken: string = req.body.refreshToken;
    const fingerprint: string = req.body.fingerprint;
    return await this.authService.regenerateRefreshToken(
      refreshToken,
      fingerprint,
    );
  }
}
