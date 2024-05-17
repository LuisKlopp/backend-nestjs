import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Post('check-password/:commentId')
  async checkPassword(
    @Param('commentId') commentId: number,
    @Body() passwordBody: { password: string },
  ): Promise<boolean> {
    if (!passwordBody || !passwordBody.password) {
      return false;
    }
    const password = passwordBody.password;
    return this.commentsService.verifyCommentPassword(commentId, password);
  }

  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.update(commentId, updateCommentDto);
  }

  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @Body() passwordBody: { password: string },
  ): Promise<void> {
    const password = passwordBody.password;
    await this.commentsService.delete(commentId, password);
  }
}
