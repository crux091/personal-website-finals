import { Module } from '@nestjs/common'
import { GuestbookService } from './guestbook.service'

@Module({
  providers: [GuestbookService],
  exports: [GuestbookService],
})
export class GuestbookModule {}
