import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Review } from "./pages/review";
import { Business } from "./pages/Business";
import Header from "./components/share/Header";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Categories_page } from "./pages/Categories_page";
import { useDispatch } from "react-redux";
import { setServer } from "./store/serverSlice";
import { Category_single } from "./pages/Category_single";
import { WriteReview } from "./pages/WriteReview";
import { CallbackPage } from "./pages/auth/CallbackPage";
import { ResetPassword } from "./pages/auth/ResetPassword"
import { SendMail } from "./pages/auth/SendMail";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const dispatch = useDispatch();

  dispatch(setServer("http://localhost:3000/"));

  return (
    <div className="bg-slate-100 min-h-screen text-gray-800">
      
      {!location.pathname.startsWith("/auth") && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/business/:id" element={<Business />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/category/:id" element={<Category_single />} />
        <Route path="/categories" element={<Categories_page />} />
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/sendmail" element={<SendMail />} />
        <Route path="/auth/callback" element={<CallbackPage />} />
      </Routes>
    </div>
  );
}

export default App;
