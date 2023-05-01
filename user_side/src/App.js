import Home from "./pages/Home";
import User from "./pages/User";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Setting from "./pages/Setting";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Error from "./flash/Error";
function App() {
  const { currUser } = useSelector((state) => state.user);
  // const { accessToken } = useSelector((state) => state.user);
  console.log(currUser);
  return (
    <>
      <Router>
        {!currUser && (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
        {currUser && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/settings/:id" element={<Setting />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
