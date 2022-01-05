import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';

export const authenticate = () =>
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/'
	});

// passport.use(
// 	new OAuth2Strategy(
// 		{
// 			authorizationURL: 'https://www.example.com/oauth2/authorize',
// 			tokenURL: 'https://www.example.com/oauth2/token',
// 			clientID: '925791237175394344',
// 			clientSecret: process.env.DISCORD_SECRET || 'null',
// 			callbackURL: 'http://localhost:3000/auth/example/callback'
// 		},
// 		(accessToken, refreshToken, profile, cb) => {
// 			User.findOrCreate({ exampleId: profile.id }, function (err, user) {
// 				return cb(err, user);
// 			});
// 		}
// 	)
// );
