import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('posts/:postId')
  async getComments(@Param('postId') postId: number): Promise<Comment[]> {
    return this.commentsService.getComments(postId);
  }
}
