import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home";
import WeatherResponse from "./pages/weather-response";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/response" exact element={<WeatherResponse />} />
      </Routes>
    </Router>
  );
}

export default App;
