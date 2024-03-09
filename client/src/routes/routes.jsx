import {
	Outlet,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Home from "../layouts/home";
import { Suspense, lazy } from "react";

export const BoardComponent = lazy(() =>
	import("../components/contents/board")
);
export const OverviewComponent = lazy(() =>
	import("../components/contents/overview")
);
export const UserComponent = lazy(() => import("../components/contents/user"));
const routes = [
	{
		element: (
			<Home>
				<Suspense>
					<Outlet />
				</Suspense>
			</Home>
		),
		children: [
			{ element: <BoardComponent />, index: true },
			// { path: "board", element: <BoardComponent /> },
			{ path: "user", element: <UserComponent /> },
		],
	},
];
export const router = createBrowserRouter(routes);
