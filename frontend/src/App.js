import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateVotes from "./CreateVotes";
import Navbar from "./Navbar";
import Votes from "./Votes";
import { useState, useEffect } from "react";
import { connect, getContract } from "./contract";

function App() {

  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) {
        handleInit();
      } else setConnected(false);
    });
  }, [])

  const handleInit = () => {
    setConnected(true);
    const { contract, signer } = getContract();
    setContract(contract);

    if (contract) {
      signer.getAddress().then((address) => {
        contract.members(address).then((result) => setIsMember(result));
      });
    }
  };

  // Next: npx hardhat node + separate terminal npx hardhat run scripts/deploy.js --network localhost

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
