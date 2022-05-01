import Link from 'next/link'

export const Header = () => (
	<header className="flex justify-between items-center p-4 md:p-6 bg-white">
		<nav className="flex items-center">
			<Link href='/' className='rounded-full outline-offset-2'>
				<div className="w-12 aspect-square border-2 border-black rounded-full" />
			</Link>

		</nav>

		<ul className="flex items-center gap-4">
			<li>
				<Link href='/auth/login' passHref>
					Login
				</Link>
			</li>

			<li tabIndex='0' className='px-4 py-2 rounded text-white bg-purple-600 accent-slate-400 outline-offset-2'>
				<Link href='/auth/register' tabIndex='-1'>
					Sign Up
				</Link>
			</li>
		</ul>
	</header>
)
