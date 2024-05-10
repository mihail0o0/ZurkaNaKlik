import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootHeader from "./layouts/root-header";

// pages
import HomePage from "./home-page";
import PageNotFound from "./page-not-found";
import UserLoginPage from "./login/userLogin";
import TestingPage from "./testing";
import ProtectedRoute from "@/components/AuthProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootHeader />}>
      <Route index element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="testing" element={<TestingPage />} />
      </Route>

      <Route path="login" element={<UserLoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
