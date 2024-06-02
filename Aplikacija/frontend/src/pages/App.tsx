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
import Home from "./Home";
import Logout from "./login/Logout";
import AgencySignUpForm from "@/components/AgencySignUpForm";
import AgencySignUp from "./login/AgencySignUp";
import AgencyProfile from "./Profile/Agency";
import UserProfile from "./Profile/Agency/Korisnik";
import OglasiProstor from "./oglasiProstor";
import FavoriteOglasi from "./favoriteOglasi";
import Oglas from "./Oglas";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootHeader />}>
      <Route index element={<HomePage />} />

      {/* za prijavljene korisnike */}
      <Route element={<ProtectedRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="testing" element={<TestingPage />} />
        <Route path="mix" element={<TestingPage />} />
        <Route path="user/profile" element={<UserProfile />} />
        <Route path="prostor/oglasiProstor" element={<OglasiProstor />}/>
        <Route path="omiljeno" element={<FavoriteOglasi />}/>
        <Route path="/place/:id" element={<Oglas />} />
        <Route path="logout" element={<Logout />} />

        <Route path="user">
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Agencija */}
        <Route path="catering">
          <Route path="profile" element={<AgencyProfile />} />
        </Route>
      </Route>

      <Route element={<RedirectBack />}>
        <Route path="login" element={<UserLoginPage />} />
        <Route path="user/signup" element={<UserSignUpPage />} />
        <Route path="catering/register" element={<AgencySignUp />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
