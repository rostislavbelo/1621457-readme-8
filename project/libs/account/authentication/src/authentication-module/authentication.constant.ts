export enum AuthMessages {
  UserExists = 'User with this email exists',
  LoginFailed = 'Wrong password or email',
  UserNotFound = 'User not found',
  OldPasswordWrong = 'Password is wrong.'
}

export const AuthenticationResponseMessage = {
    LoggedSuccess: 'User has been successfully logged.',
    LoggedError: 'Password or Login is wrong.',
    UserFound: 'User found',
    UserNotFound: 'User not found',
    UserExist: 'User with the email already exists',
    UserCreated: 'The new user has been successfully created.',
    ServerError: 'Internal server error',
    PasswordChanged: 'Password was successfully changed.',
    PasswordChangeUnauthorized: 'Authentication failed or old password is wrong.',
    RefreshSuccess: 'Get a new access/refresh tokens',
    RefreshFailure: 'Wrong refresh token'
  } as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;  