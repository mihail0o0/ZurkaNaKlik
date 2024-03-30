import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

import './App.css';

// layouts
import RootHeader from "./layouts/RootHeader";

// pages
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import TestingPage from "./pages/TestingPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootHeader />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="testing" element={<TestingPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>

  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
