import { Module } from '@nestjs/common';
import { HelperService } from './helper/helper.service';
import { HashService } from './hash/hash.service';

@Module({
	providers: [HelperService, HashService],
	exports: [HelperService, HashService],
})
export class CommonModule {}
