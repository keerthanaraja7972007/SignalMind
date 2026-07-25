import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Commuter from "./pages/Commuter";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/commuter"
          element={<Commuter />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;