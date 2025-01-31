import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters, HttpStatus, FileTypeValidator,  MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseInterceptors, UseGuards, Param, Get, HttpCode} from '@nestjs/common';
import { LoginUserDto, AuthenticationResponseMessage, LoggedUserRdo, UserRdo, ChangePasswordDto, TokenPairRdo, UserDetailsRdo } from '@project/authentication';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRegisterDto } from './dto/user-register.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';



@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthenticationResponseMessage.ServerError,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async register(
    @Body() dto: UserRegisterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      })
    )
    avatar?: Express.Multer.File
  ) {
    if (avatar) {
      const formData = new FormData();

      formData.append(
        'file',
        new Blob([avatar.buffer], { type: avatar.mimetype }),
        avatar.originalname
      );

      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Files}/upload`,
        formData
      );

      dto.avatar = data.id;
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      dto
    );
    return data;
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );
    return data;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.PasswordChanged,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.PasswordChangeUnauthorized,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthenticationResponseMessage.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @Post('password')
  public async changePassword(
    @Body() dto: ChangePasswordDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/password`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @ApiResponse({
    type: TokenPairRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.RefreshSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.RefreshFailure,
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @ApiResponse({
    type: UserDetailsRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':id')
  public async getUserDetails(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }


  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AuthenticationResponseMessage.SubsciptionSucess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.JwtAuthFailed,
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('toggle-subscribe/:id')
  public async toggleSubscribe(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/toggle-subscribe/${id}`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
  }
}