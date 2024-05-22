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
import UserLoginPage from "./login/UserLogin";
import TestingPage from "./testing";
import ProtectedRoute from "@/components/AuthProvider/ProtectedRoute";
import UserSignUpPage from "./login/UserSignUp";
import RedirectBack from "@/components/AuthProvider/RedirectBack";
import Search from "./search";
import Logout from "./login/Logout";
import AgencySignUpForm from "@/components/AgencySignUpForm";
import AgencySignUp from "./login/AgencySignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootHeader />}>
      <Route index element={<HomePage />} />

      {/* za prijavljene korisnike */}
      <Route element={<ProtectedRoute />}>
        <Route path="search" element={<Search />} />
        <Route path="testing" element={<TestingPage />} />
        <Route path="mix" element={<TestingPage />} />
        <Route path="logout" element={<Logout />}/ >
      </Route>

      <Route element={<RedirectBack />}>
        <Route path="login" element={<UserLoginPage />} />
        <Route path="user/signup" element={<UserSignUpPage />} />
        <Route path="catering/register" element={<AgencySignUp />}/>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
