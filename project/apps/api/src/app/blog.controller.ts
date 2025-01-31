import {
    Body,
    Controller,
    Post,
    UseFilters,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { HttpService } from '@nestjs/axios';
  
  import { AxiosExceptionFilter } from './filters/axios-exception.filter';
  import { CheckAuthGuard } from './guards/check-auth.guard';
  import { ApplicationServiceURL } from './app.config';
  import { InjectAuthorIdInterceptor } from '@project/interceptors';
  // import { AddNewPostDto } from './dto/add-new-post.dto';
  
  @Controller('blog')
  @UseFilters(AxiosExceptionFilter)
  export class BlogController {
    constructor(private readonly httpService: HttpService) {}
  
    @UseGuards(CheckAuthGuard)
    @UseInterceptors(InjectAuthorIdInterceptor)
    @Post('/')
    public async create(@Body() dto) {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Blog}/`,
        dto
      );
      return data;
    }
  }