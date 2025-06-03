import { Await, NavLink, Outlet, useLoaderData } from 'react-router';
import { NonEssentialSuspense } from '~/components/non-essential-suspense';
import { getSession, sessionMiddleware } from '~/middleware/auth.server';
import type { Route } from './+types/$org';

export const unstable_middleware = [sessionMiddleware];

export const loader = ({ context }: Route.LoaderArgs) => {
	const session = getSession(context);

	return {
		user: session,
	};
};

const User = () => {
	const { user } = useLoaderData<typeof loader>();

	return (
		/** Replace this with suspense for shit UX */
		<NonEssentialSuspense fallback={<div>…</div>}>
			<Await resolve={user}>
				{(user) => {
					if (!user) return null;
					return <p>{user.name}</p>;
				}}
			</Await>
		</NonEssentialSuspense>
	);
};

export default function Layout(_: Route.ComponentProps) {
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

				<User />
			</nav>
			<main className="p-4">
				<Outlet />
			</main>
		</div>
	);
}
