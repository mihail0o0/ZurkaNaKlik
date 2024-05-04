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
// import TestingPage from "./pages/TestingPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootHeader />}>
      <Route index element={<HomePage />} />
      <Route path="testing" element={<TestingPage />} />
      <Route path="login" element={<UserLoginPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
