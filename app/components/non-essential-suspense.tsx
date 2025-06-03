import { Suspense } from 'react';
import { useState } from 'react';
import type { SuspenseProps } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const OnMount = ({ onMount }: { onMount: () => void }) => {
	useEffect(() => {
		onMount();
	}, [onMount]);
	return null;
};
export const NonEssentialSuspense = (props: SuspenseProps) => {
	const [fallback, setFallback] = useState<React.ReactNode>(props.fallback);

	return (
		<Suspense {...props} key={useLocation().key} fallback={fallback}>
			<OnMount onMount={() => setFallback(props.children)} />
			{props.children}
		</Suspense>
	);
};
