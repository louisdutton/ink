import React, { useState } from "react";
import Navigation from "./Navigation";
import Identity from "./Identity";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

export default function Header() {
	const [user, loading, error] = useAuthState(auth);

	if (!user) return <div />;
	return (
		<header className="absolute top-0 left-0 z-50 flex justify-between w-screen px-4 py-3">
			<Identity />
			<Navigation />
		</header>
	);
}
