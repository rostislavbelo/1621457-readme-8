import { Expose } from 'class-transformer';

export class BlogPostContentRdo {
  @Expose()
  public title: string;

  @Expose()
  public linkUrl: string;

  @Expose()
  public linkDescription: string;

  @Expose()
  public photoUrl: string;

  @Expose()
  public quote: string;

  @Expose()
  public quoteAuthor: string;

  @Expose()
  public teaser: string;

  @Expose()
  public text: string;

  @Expose()
  public videoUrl: string;
}