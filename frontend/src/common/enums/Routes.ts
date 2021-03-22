export enum Routes {
  BaseUrl = '/',
  Auth = '/auth/:page',
  SignUp = '/auth/sign-up',
  SignIn = '/auth/sign-in',
  ForgotPassword = '/auth/forgot',
  ResetPassword = '/auth/reset/:token',
  Apps = '/apps',
  Settings = '/settings',
  Resources = '/resources',
  ResourcesAddEdit = '/resources/edit',
  Invite = '/:inviteToken',
  AppEditor = '/app/editor/:id'
}
