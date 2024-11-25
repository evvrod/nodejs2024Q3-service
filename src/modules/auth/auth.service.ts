import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

async function getHash(password: string) {
  const saltRounds = Number(process.env.CRYPT_SALT) || 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function isPasswordsCompare(
  confirmPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(confirmPassword, hashedPassword);
}

@Injectable()
export class AuthService {
  private readonly tokenExpireTime: string;
  private readonly tokenRefreshExpireTime: string;
  private readonly jwtSecret: string;
  private readonly jwtSecretRefresh: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.tokenExpireTime = process.env.TOKEN_EXPIRE_TIME || '60m';
    this.tokenRefreshExpireTime =
      process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

    this.jwtSecret = process.env.JWT_SECRET_KEY || 'secret123123';
    this.jwtSecretRefresh =
      process.env.JWT_SECRET_REFRESH_KEY || 'secret123123';
  }

  async signup(signupDto: SignupDto) {
    const { login, password } = signupDto;

    const existingUser = await this.userService.findByLoginWithPass(login);
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    const newUser = await this.userService.create({
      login,
      password: await getHash(password),
    });

    const tokens = await this.generateTokens(newUser.id, newUser.login);

    return { id: newUser.id, ...tokens };
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;

    const user = await this.userService.findByLoginWithPass(login);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await isPasswordsCompare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.login);

    return { id: user.id, ...tokens };
  }

  async refresh(refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.jwtSecretRefresh,
      });

      console.log(decoded);

      const tokens = await this.generateTokens(decoded.userId, decoded.login);
      console.log(tokens);

      return tokens;
    } catch {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }

  private async generateTokens(userId: string, login: string) {
    const accessToken = this.jwtService.sign(
      { userId, login },
      { secret: this.jwtSecret, expiresIn: this.tokenExpireTime },
    );
    const refreshToken = this.jwtService.sign(
      { userId, login },
      {
        secret: this.jwtSecretRefresh,
        expiresIn: this.tokenRefreshExpireTime,
      },
    );
    return { accessToken, refreshToken };
  }
}
