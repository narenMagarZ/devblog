import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Enter from "./components/enter";
import Home from "./components/home/home";
import UserNewPassword from "./components/recover_password/user_new_password";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/enter" element={<Enter/>} />
        <Route path="/users/password/new" element={<UserNewPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;