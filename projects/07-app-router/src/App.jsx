import "./App.css";
import { lazy, Suspense } from "react";

//import('./pages/About') import dinámico (con promesa)
const LazyAboutPage = lazy(() => import("./pages/About"));
//import AboutPage from "./pages/About"; //import estático
import HomePage from "./pages/Home";
import { Router } from "./components/Router";
import { Route } from "./components/Route";
import Page404 from "./pages/404";
import SearchPage from "./pages/Search";

const appRoutes = [
  {
    path: "/:lang/about",
    Component: LazyAboutPage,
  },
  {
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* {currentPath === "/" && <HomePage />}
      {currentPath === "/about" && <AboutPage />} */}
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </>
  );
}

export default App;
