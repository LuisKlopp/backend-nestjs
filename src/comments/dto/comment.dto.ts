export class CommentDto {
  readonly id: number;
  readonly post_id: number;
  readonly nickname: string;
  readonly content: string;
  readonly created_at: Date;
}
