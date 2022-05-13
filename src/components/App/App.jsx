import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import HomePage from "../../pages/home";

import Login from "../../pages/login";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<AppHeader />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{padding: "1rem"}}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
