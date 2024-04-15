import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':slug')
  async getPost(@Param('slug') slug: string): Promise<Post> {
    return await this.postsService.getPost(slug);
  }
}
