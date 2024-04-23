import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/homepage/loginPage";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <div>
        <Routes>

          <Route
            path='/' 
            element={<LoginPage />}>
          </Route>

          <Route 
            path='/dashboard' 
            element={<Dashboard />}>
          </Route>
x
        </Routes>
    </div>
  );
}

export default App;
