import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':slug')
  async getPost(@Param('slug') slug: string): Promise<PostEntity> {
    await this.postsService.incrementViews(slug);
    return await this.postsService.getPost(slug);
  }

  @Post('like/:postId')
  async likePost(@Param('postId') postId: number) {
    return this.postsService.likePost(postId);
  }

  @Delete('like/:postId')
  async unlikePost(@Param('postId') postId: number) {
    return this.postsService.unlikePost(postId);
  }
}
