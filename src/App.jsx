import "./index.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/home";
import { Review } from "./pages/review";
import { Business } from "./pages/Business";
import Header from "./components/share/Header";
import { Login } from "./pages/Login";
import { Category } from "./pages/Category";
import { Categories_page } from "./pages/Categories_page";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <div className="bg-slate-100 min-h-screen text-gray-800">

      {location.pathname !== '/login' && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/business/:id" element={<Business />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/categories" element={<Categories_page />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
