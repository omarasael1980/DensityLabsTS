import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Mensajes from "./pages/Mensajes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Mensajes />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
