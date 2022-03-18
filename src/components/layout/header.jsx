import Link from 'next/link'

export const Header = () => {
	return (
		<header className="flex justify-between items-center p-4 md:p-6 bg-white">
			<nav className="flex items-center">
				<Link href='/' passHref>
					<a className='rounded-full outline-offset-2'>
						<div className="w-12 aspect-square border-2 border-black rounded-full"></div>
					</a>
				</Link>

			</nav>

			<ul className="flex items-center gap-4">
				<li>
					<Link href='/auth/login' passHref>
						<a>
							Login
						</a>
					</Link>
				</li>

				<li tabIndex='0' className='px-4 py-2 rounded text-white bg-purple-600 accent-slate-400 outline-offset-2'>
					<Link href='/auth/register' passHref>
						<a tabIndex='-1'>
							Sign Up
						</a>
					</Link>
				</li>
			</ul>
		</header>
	)
}
