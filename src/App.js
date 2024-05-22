import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import Dashboard from "./pages/dashboard/dashboard";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";

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

          <Route 
            path='/adminDashboard' 
            element={<AdminDashboard />}>
          </Route>
x
        </Routes>
    </div>
  );
}

export default App;
