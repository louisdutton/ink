import { useState, useEffect, PropsWithChildren, ReactNode } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const RouteGuard = ({ children }: any): JSX.Element => {
	const router = useRouter();
	const [user, loading, error] = useAuthState(auth);
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		// on initial load - run auth check
		if (loading) return;
		authCheck(router.asPath);

		// on route change start - hide page content by setting authorized to false
		const hideContent = () => setAuthorized(false);
		router.events.on("routeChangeStart", hideContent);

		// on route change complete - run auth check
		router.events.on("routeChangeComplete", authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			router.events.off("routeChangeStart", hideContent);
			router.events.off("routeChangeComplete", authCheck);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, loading]);

	function authCheck(url: string) {
		// redirect to login page if accessing a private page and not logged in
		const publicPaths = ["/login"];
		const path = url.split("?")[0];
		if (!user && !publicPaths.includes(path)) {
			setAuthorized(false);
			router.push({
				pathname: "/login",
				query: { returnUrl: router.asPath },
			});
		} else {
			setAuthorized(true);
		}
	}

	return authorized ? children : <div />;
};

export default RouteGuard;
