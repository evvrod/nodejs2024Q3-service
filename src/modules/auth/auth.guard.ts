import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface AuthenticatedRequest extends Request {
  info: { userId: string; login: string; exp: number; iat: number };
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;
  private readonly jwtSecretRefresh: string;

  constructor(private readonly jwtService: JwtService) {
    this.jwtSecret = process.env.JWT_SECRET_KEY || 'secret123123';
    this.jwtSecretRefresh =
      process.env.JWT_SECRET_REFRESH_KEY || 'secret123123';
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const excludedRoutes = ['/auth/signup', '/auth/login', '/', '/api-docs'];

    if (excludedRoutes.includes(request.url)) {
      return true;
    }

    if (request.url === '/auth/refresh' && request.method === 'POST') {
      const token = request.body?.refreshToken;
      if (!token) {
        throw new UnauthorizedException(
          'Missing refresh token in request body',
        );
      }
      return this.validateRefreshToken(token, request);
    }

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const token = authHeader.split(' ')[1];
    return this.validateAccessToken(token, request);
  }

  private validateAccessToken(token: string, request: any): boolean {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.jwtSecret,
      });
      (request as AuthenticatedRequest).info = decoded;
      return true;
    } catch {
      throw new ForbiddenException('Access token verification failed');
    }
  }

  private validateRefreshToken(token: string, request: any): boolean {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.jwtSecretRefresh,
      });
      (request as AuthenticatedRequest).info = decoded;
      return true;
    } catch {
      throw new ForbiddenException('Refresh token verification failed');
    }
  }
}
