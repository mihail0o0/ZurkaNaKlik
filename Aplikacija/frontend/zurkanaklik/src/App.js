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
import Home from "./pages/Home";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootHeader />}>
      <Route index element={<Home />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
