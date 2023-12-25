import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Evdb from "./pages/Evdb";
import Requirements from "./pages/Requirements";
import Calculatorres from "./pages/Calculatorres";
import Calculator from "./pages/Calculator";
import Landing from "./pages/Landing";
import Compare from "./pages/Compare";
import Dbtable from "./pages/Dbtable";
import Vehicle from "./pages/Vehicle";
import Compareres from "./pages/Compareres";
import Admin_entry from "./pages/Admin_entry";
import Admin_login from "./pages/Admin_login";
import Admin_register from "./pages/Admin_register";
import Logout_logic from "./pages/Logout_logic";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/evdb" element={<Evdb />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/dbtable" element={<Dbtable />} />
            <Route path="/vehicle_info/:vehicle" element={<Vehicle />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/calculatorres" element={<Calculatorres />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/compareres" element={<Compareres />} />
            <Route path="/admin_login" element={<Admin_login />} />
            <Route path="/admin_post" element={<Admin_entry />} />
            <Route path="/admin_register" element={<Admin_register />} />
            <Route path="/logout" element={<Logout_logic />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
