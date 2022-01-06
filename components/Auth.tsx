import {
	GoogleLogo,
	GithubLogo,
	DiscordLogo,
	TwitterLogo,
	Drop
} from 'phosphor-react';
import Button from './Button';
import IconButton from './IconButton';

export default function SignIn() {
	return (
		<div className="flex flex-col gap-4 bg-white rounded-xl py-8 px-16 shadow-2xl">
			<h1 className="font-bold text-4xl text-center py-4">Sign in</h1>
			<div className="flex flex-col gap-2">
				<Button outline>
					Sign in with Discord <DiscordLogo size={30} weight="fill" />
				</Button>
				<Button outline>
					Sign in with Github <GithubLogo size={30} weight="fill" />
				</Button>
				<Button outline>
					Sign in with Google <GoogleLogo size={30} weight="fill" />
				</Button>
			</div>
			<hr />
		</div>
	);
}
