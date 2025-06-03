import { Suspense } from 'react';
import { Await, Link, useLocation } from 'react-router';
import { getSession } from '~/middleware/auth.server';
import type { Route } from './+types/$org.pages._index';

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

export default function Pages({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<h1>Pages</h1>
			<Suspense key={useLocation().key} fallback={<div>Loading...</div>}>
				<Await resolve={loaderData.pages}>
					{(pages) => {
						return (
							<ul>
								{pages.map((page) => (
									<li key={page.id}>
										<Link to={`${page.id}`}>{page.title}</Link>
									</li>
								))}
							</ul>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}
