import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { GuestbookService } from './guestbook.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  /**
   * GET /guestbook
   * Returns the latest 20 guestbook comments
   */
  @Get()
  findAll() {
    return this.guestbookService.findAll()
  }

  /**
   * POST /guestbook
   * Creates a new guestbook comment
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCommentDto) {
    return this.guestbookService.create(dto.name, dto.message)
  }
}
