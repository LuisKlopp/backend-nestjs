import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getComments(postId: number): Promise<Comment[]> {
    return await this.commentRepository.find({ where: { post_id: postId } });
  }

  async create(
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const newComment = this.commentRepository.create({
      ...createCommentDto,
      post_id: postId,
    });
    return await this.commentRepository.save(newComment);
  }

  async verifyCommentPassword(
    commentId: number,
    password: string,
  ): Promise<boolean> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new HttpException('해당하는 댓글이 없습니다', HttpStatus.NOT_FOUND);
    }

    if (comment.password !== password) {
      throw new HttpException('비밀번호가 틀렸습니다', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
