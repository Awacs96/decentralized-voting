import { ethers } from "ethers";

const address = "0xb7f8bc63bbcad18155201308c8f3540b07f84f5e";
const abi = [
    "event MemberJoined(address indexed member, uint256 joinedAt)",
    "event VoteCreated(address indexed owner, uint256 indexed voteId, uint256 indexed createdAt, uint256 endTime)",
    "event Voted(address indexed voter, uint256 indexed voteId, uint256 indexed option, uint256 createdAt)",
    "function createVote(string uri, uint256 endTime, uint256 options)",
    "function didVote(address member, uint256 voteId) view returns (bool)",
    "function getVote(uint256 voteId) view returns (string, address, uint256[], uint256)",
    "function join()",
    "function vote(uint256 voteId, uint256 option)"
  ];
const provider = new ethers.provider.Web3Provider(window.ethereum);

export const connect = async () => {
    await provider.send("eth_requestAccounts", []);
    return getContract();
}

export const getContract = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return { signer: signer, contract: contract };
}
