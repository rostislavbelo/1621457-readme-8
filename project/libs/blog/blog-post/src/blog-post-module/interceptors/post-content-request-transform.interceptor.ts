import { Observable } from 'rxjs';
import {
    Injectable,
    CallHandler,
    NestInterceptor,
    ExecutionContext    
  } from '@nestjs/common';  
  
  @Injectable()
  export class PostContentRequestTransform implements NestInterceptor {
    public intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Observable<unknown> {
      const request = context.switchToHttp().getRequest();
      if (request?.body?.content && request?.body?.type) {
        request.body.content.__type = request.body.type;
      }
  
      return next.handle();
    }
  }