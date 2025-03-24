import { Suspense, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../layouts/home";

export const BoardDialog = lazy(() => import("../components/dialogs/board"));
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
			{ path: ":boardId/:method", element: <BoardDialog /> },
		],
	},
];
export const router = createBrowserRouter(routes);
