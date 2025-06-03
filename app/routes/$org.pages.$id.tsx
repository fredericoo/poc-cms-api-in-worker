import { Suspense } from 'react';
import { Await } from 'react-router';
import { getSession } from '~/middleware/auth.server';
import type { Route } from './+types/$org.pages.$id';

export const loader = ({ context, params }: Route.LoaderArgs) => {
	const session = getSession(context);

	return {
		page: session.then(() => ({
			id: params.id,
			title: 'Page 1',
			description: 'Description 1',
		})),
	};
};

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<h1>Page</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={loaderData.page}>{(page) => <div>{page.title}</div>}</Await>
			</Suspense>
		</div>
	);
}
