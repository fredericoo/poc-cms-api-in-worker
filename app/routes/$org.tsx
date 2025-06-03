import { Suspense } from 'react';
import { Await, NavLink, Outlet, useLocation } from 'react-router';
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
		<Suspense fallback={<div>…</div>}>
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
					{/* using a key here reverts the user to fallback every time.
              we dont want that because then the UI will flash with no user until it gets resolved
              the ideal UI would be removing this key and letting the previous state show
              BUT then it holds children navigation */}
					<Suspense key={useLocation().key} fallback={<div>…</div>}>
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
		</Suspense>
	);
}
