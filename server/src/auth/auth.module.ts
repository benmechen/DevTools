import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [CommonModule, UserModule],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
