import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';
import { JWTStrategy } from './jwt.strategy';

@Module({
	imports: [CommonModule, UserModule, PassportModule],
	providers: [AuthService, JWTStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
