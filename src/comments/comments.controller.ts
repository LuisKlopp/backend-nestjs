import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('posts/:postId')
  async getComments(@Param('postId') postId: number): Promise<Comment[]> {
    return this.commentsService.getComments(postId);
  }

  @Post('posts/:postId')
  async create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(postId, createCommentDto);
  }
}
