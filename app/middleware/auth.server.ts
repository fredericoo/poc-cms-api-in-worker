import {
	type unstable_MiddlewareFunction,
	type unstable_RouterContextProvider,
	unstable_createContext,
} from 'react-router';

export const AuthContext = unstable_createContext<Promise<{ name: string } | null>>();

export function getSession(context: unstable_RouterContextProvider) {
	return context.get(AuthContext);
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const sessionMiddleware: unstable_MiddlewareFunction<Response> = async ({ context }, next) => {
	const user = sleep(1000).then(() => ({ name: 'John Doe' }));
	context.set(AuthContext, user);
	return await next();
};
