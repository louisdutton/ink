import { FcGoogle } from 'react-icons/fc'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FormEvent, useRef } from 'react';
import AuthButton from './AuthButton';
import Button from './Button';
import IconButton from './IconButton';
import Input from './Input';
import { useSockets } from './SocketContext';


export default function SignIn() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const {setUsername } = useSockets();


  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = usernameInput.current?.value;
    if (!value?.trim()) return;
    setUsername(value);
  };

	return (
    <form onSubmit={formHandler} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="font-bold text-4xl text-center py-4">Sign in</h1>
    	<div className="flex flex-col gap-2">
				<AuthButton className='bg-[#5865F2] border-[#5865F2] hover:bg-[#626fFc] hover:border-[#626fFc] text-white'>
          <FaDiscord size={28} />
          <p>Sign in with Discord</p> 
				</AuthButton>
				<AuthButton className='bg-neutral-700 border-neutral-700 text-white hover:bg-neutral-600 hover:border-neutral-600'>
          <FaGithub size={27} />
          <p>Sign in with Github</p>
				</AuthButton>
				<AuthButton className='text-neutral-600 hover:border-neutral-300'>
          <FcGoogle size={28}/>
          <p>Sign in with Google</p> 
				</AuthButton>
			</div>
    <div className='relative text-neutral-400 my-4 uppercase text-xs tracking-wider'>
      <hr className='border-neutral-300 dark:border-neutral-500'/>
      <p className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 px-4 whitespace-nowrap'>Or sign in anonymously</p>
    </div>
    <Input ref={usernameInput} label="username" />
    <div className='my-2' />
    <Button type="submit">Play</Button>
  </form>
	);
}
