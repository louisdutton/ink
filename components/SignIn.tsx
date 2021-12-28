import {
	GoogleLogo,
	GithubLogo,
	DiscordLogo,
	RedditLogo,
	TwitterLogo
} from 'phosphor-react';
import {
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import IconButton from '../components/IconButton';
import { useState } from 'react';
import Input from './Input';

export default function SignIn() {
	const provider = {
		google: new GoogleAuthProvider(),
		github: new GithubAuthProvider()
	};

	const [formValue, setFormValue] = useState<string>('inker');

	const handleSubmit = () => {
		console.log(formValue);
	};

	return (
		<div className="flex flex-col gap-">
			{/* <form onSubmit={handleSubmit}>
				<Input
					value={formValue}
					label="username"
					onChange={(e) => setFormValue(e.target.value)}
				/>
				<button type="submit" />
			</form> */}
			<div className="flex gap-2">
				<IconButton onClick={() => signInWithPopup(auth, provider.google)}>
					<GoogleLogo size={30} weight="fill" />
				</IconButton>
				<IconButton onClick={() => signInWithPopup(auth, provider.github)}>
					<GithubLogo size={30} weight="fill" />
				</IconButton>
				<IconButton
					onClick={() => console.log('Discord auth is not yet implemented.')}>
					<DiscordLogo size={30} weight="fill" />
				</IconButton>
				<IconButton
					onClick={() => console.log('Reddit auth is not yet implemented.')}>
					<RedditLogo size={30} weight="fill" />
				</IconButton>
				<IconButton
					onClick={() => console.log('Twitter auth is not yet implemented.')}>
					<TwitterLogo size={30} weight="fill" />
				</IconButton>
			</div>
		</div>
	);
}

const USERNAMES = [
	'ink-a-tron',
	'inky',
	'mr. inkcredible',
	'stinky',
	'pinky',
	'thinky',
	'inky',
	'winky',
	'dinky',
	'slinky'
];
