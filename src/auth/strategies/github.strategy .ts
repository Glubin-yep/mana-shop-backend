// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy } from 'passport-github2';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
//   constructor(private authService: AuthService) {
//     super({
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: process.env.GITHUB_CALLBACK_URL,
//     });
//   }

//   async validate(accessToken: string, _refreshToken: string, profile: Profile) {
//     return profile;
//   }
// }
