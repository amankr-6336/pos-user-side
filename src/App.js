import LandingPage from "./Page/LandingPage/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import ErrorBoundary from "./utils/ErrorBoundary";
import RecommendedDish from "./component/recommendedDish/RecommendedDish";
import AllDish from "./component/AllDish/AllDish";

const generateGuestToken = () => {
  let guestToken = localStorage.getItem("guestToken");
  if (!guestToken) {
    guestToken = crypto.randomUUID(); // Generates a unique token
    localStorage.setItem("guestToken", guestToken);
  }
  return guestToken;
};

function App() {
  useEffect(() => {
    generateGuestToken(); // Ensures a token exists before making API calls
  }, []);

  return (
    <Routes>
      {/* <Route path="/">
        <Route path="/:restroId/:tableId" element={<LandingPage />} />
      </Route> */}
      <Route path="/" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<ErrorPage />} />

      <Route
        path="/:restroId/:tableId"
        element={
          <ErrorBoundary>
            <LandingPage />
          </ErrorBoundary>
        }
      >
        <Route index element={<Navigate to="recommended" replace />} />
        <Route path="recommended" element={<RecommendedDish />} />
        <Route path="all" element={<AllDish />} />
      </Route>
    </Routes>
  );
}

export default App;
