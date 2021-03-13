import { Module } from '@nestjs/common';
import { HelperService } from './helper/helper.service';

@Module({
  providers: [HelperService]
})
export class CommonModule {}
