import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateVotes from "./CreateVotes";
import Navbar from "./Navbar";
import Votes from "./Votes";

function App() {
  return <Router>
    <Navbar/>
    <div>
      <Routes>
        <Route path="create-vote" element={ <CreateVotes /> } />
        <Route path="votes" element={ <Votes /> } />
      </Routes>
    </div>
  </Router>
}

export default App;
