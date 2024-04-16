import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getPost(slug: string): Promise<PostEntity> {
    return await this.postRepository.findOne({ where: { urls: slug } });
  }

  async likePost(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOneBy({ id });
    console.log(post);
    post.likes += 1;
    return this.postRepository.save(post);
  }
}
