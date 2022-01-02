import { Provider } from '@supabase/supabase-js';
import {
	GoogleLogo,
	GithubLogo,
	DiscordLogo,
	TwitterLogo
} from 'phosphor-react';
import supabase from '../lib/supabase';
import IconButton from './IconButton';

export default function SignIn() {
	const signIn = async (provider: Provider) => {
		const { user, error } = await supabase.auth.signIn({ provider });
		console.log(user, error);
	};

	return (
		<div className="flex flex-col gap-">
			<div className="flex gap-2">
				<IconButton onClick={() => signIn('discord')}>
					<DiscordLogo size={30} weight="fill" />
				</IconButton>
				<IconButton onClick={() => signIn('github')}>
					<GithubLogo size={30} weight="fill" />
				</IconButton>
			</div>
		</div>
	);
}
