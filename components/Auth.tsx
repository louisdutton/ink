import { Provider } from '@supabase/supabase-js';
import {
	GoogleLogo,
	GithubLogo,
	DiscordLogo,
	TwitterLogo,
	Drop
} from 'phosphor-react';
import supabase from '../lib/supabase';
import Button from './Button';
import IconButton from './IconButton';

export default function SignIn() {
	const signIn = async (provider: Provider) => {
		const { user, error } = await supabase.auth.signIn({ provider });
		console.log(user, error);
	};

	return (
		<div className="flex flex-col gap-4 bg-white rounded-xl py-8 px-16 shadow-2xl">
			<h1 className="font-bold text-4xl text-center py-4">Sign in</h1>
			<div className="flex flex-col gap-2">
				<Button outline onClick={() => signIn('discord')}>
					Sign in with Discord <DiscordLogo size={30} weight="fill" />
				</Button>
				<Button outline onClick={() => signIn('github')}>
					Sign in with Github <GithubLogo size={30} weight="fill" />
				</Button>
				<Button outline onClick={() => signIn('google')}>
					Sign in with Google <GoogleLogo size={30} weight="fill" />
				</Button>
			</div>
			<hr />
		</div>
	);
}
