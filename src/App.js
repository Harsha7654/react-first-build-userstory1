import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/404";
import SignIn from "./components/pages/SignIn";
import ContactUs from "./components/pages/ContactUs";
import Modules from "./components/pages/Modules";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/modules" element={<Modules />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
