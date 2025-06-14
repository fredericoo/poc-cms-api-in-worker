import { Suspense } from 'react';
import { Await } from 'react-router';
import { getSession } from '~/middleware/auth.server';
import type { Route } from './+types/$org.themes';

export const loader = ({ context }: Route.LoaderArgs) => {
	const session = getSession(context);

	return {
		pages: session.then(() =>
			Array.from({ length: 100 }, (_, i) => ({
				id: i,
				title: `Page ${i}`,
				description: `Description ${i}`,
			})),
		),
	};
};

export default function Pages({ loaderData, params }: Route.ComponentProps) {
	return (
		<div>
			<h1>Themes</h1>
			<Suspense key={params.org} fallback={<div>Loading...</div>}>
				<Await resolve={loaderData.pages}>
					{(pages) => {
						return (
							<ul>
								{pages.map((page) => (
									<li key={page.id}>{page.title}</li>
								))}
							</ul>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}
