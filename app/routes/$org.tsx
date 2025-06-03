import { Suspense } from 'react';
import { Await, NavLink, Outlet } from 'react-router';
import { getSession, sessionMiddleware } from '~/middleware/auth.server';
import type { Route } from './+types/$org';

export const unstable_middleware = [sessionMiddleware];

export const loader = ({ context }: Route.LoaderArgs) => {
	const session = getSession(context);

	return {
		user: session,
	};
};

export default function Layout({ loaderData }: Route.ComponentProps) {
	const user = loaderData.user;

	return (
		<div>
			<nav className="flex gap-4 border-neutral-200 border-b p-4">
				<div className="flex flex-1 gap-4">
					<NavLink to="pages" className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
						Pages
					</NavLink>
					<NavLink to="themes" className={({ isActive }) => (isActive ? 'text-blue-500' : '')}>
						Themes
					</NavLink>
				</div>

				<div>
					<Suspense fallback={<div>…</div>}>
						<Await resolve={user}>
							{(user) => {
								if (!user) return null;
								return <p>{user.name}</p>;
							}}
						</Await>
					</Suspense>
				</div>
			</nav>
			<main className="p-4">
				<Outlet />
			</main>
		</div>
	);
}
