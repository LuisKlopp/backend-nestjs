import { Injectable } from '@nestjs/common';
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

  async create(commentData: CreateCommentDto): Promise<void> {
    const newComment = this.commentRepository.create(commentData);
    await this.commentRepository.save(newComment);
  }
}
