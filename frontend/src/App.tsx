import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, BrowserRouter } from "react-router-dom";
import SigninForm from "./components/sign-in-form/sign-in-form";
import SignupForm from "./components/sign-up-form/sign-up-form";
import WelcomePage from "./components/welcome-page/welcome-page";

const App: React.FC = () => {

const ClearHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(location.pathname, { replace: true });
    window.history.pushState(null, "", location.pathname);

    const blockBack = () => {
      window.history.pushState(null, "", location.pathname);
    };

    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("popstate", blockBack);
    };
  }, [location.pathname, navigate]);

  return null;
};


  return (
    <BrowserRouter>
      <ClearHistory />
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/welcome"
          element={
              <WelcomePage onLogout={() => {}} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
