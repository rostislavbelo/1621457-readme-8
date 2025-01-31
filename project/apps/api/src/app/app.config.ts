export enum ApplicationServiceURL {
    Users = 'http://localhost:3001/api/auth',
    Blog = 'http://localhost:3002/api/posts',
    Files = 'http://localhost:3004/api/files'
  }
  
export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;