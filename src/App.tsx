import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Form from './components/Form';
import UserTable from "./components/UserTable";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
