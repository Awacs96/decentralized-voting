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
    getContract().then(({ contract, signer }) => {
      setContract(contract);

      if (contract) {
        signer.getAddress().then((address) => {
          contract.members(address).then((result) => setIsMember(result));
        });
      }
    });
  };

  const connectCallback = async () => {
    const { contract } = await connect();
    setContract(contract);

    if (contract) {
      setConnected(true);
    }
  }

  const becomeMember = async () => {
    if (!contract) {
      alert("Please connect to the Metamask.");
      return;
    }

    await contract.join().then(() => {
      alert("Joined");
      setIsMember(true);
    }).catch((error) => alert(error.message));
  }

  return <Router>
    <Navbar connect={ connectCallback } connected={ connected } becomeMember={ becomeMember } isMember={ isMember } />
    <div>
      <Routes>
        <Route path="create-vote" element={ <CreateVotes contract={ contract } /> } />
        <Route path="votes" element={ <Votes /> } />
      </Routes>
    </div>
  </Router>
}

export default App;
