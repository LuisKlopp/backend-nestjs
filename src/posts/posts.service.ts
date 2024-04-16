import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getPost(slug: string): Promise<Post> {
    return await this.postRepository.findOne({ where: { urls: slug } });
  }

  async likePost(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    console.log(post);
    post.likes += 1;
    return this.postRepository.save(post);
  }
}
