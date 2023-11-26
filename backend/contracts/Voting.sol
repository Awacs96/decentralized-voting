// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {

    uint nextVoteId;
    struct Vote {
        string uri;
        address owner;
        uint endTime;
        uint[] votes;
        mapping(address => bool) voted;
        uint options;
    }

    mapping(uint => Vote) votes;
    mapping(address => bool) isMember;

    event MemberJoined(address indexed member, uint joinedAt);
    event VoteCreated(address indexed owner, uint indexed voteId, uint indexed createdAt, uint endTime);
    event Voted(address indexed voter, uint indexed voteId, uint indexed option, uint createdAt);

    modifier senderIsMember() {
        require(isMember[msg.sender], "You are not a member.");
        _;
    }

    modifier canVote(uint voteId, uint option) {
        require(voteId < nextVoteId, "The vote does not exist.");
        require(option < votes[voteId].options, "Invalid option.");
        require(!votes[voteId].voted[msg.sender], "You have already voted.");
        require(votes[voteId].endTime >= block.timestamp, "The vote has ended.");
        _;
    }

    function join() external {
        require(!isMember[msg.sender], "You are a member already.");

        isMember[msg.sender] = true;
        emit MemberJoined(msg.sender, block.timestamp);
    }

    function createVote(string memory uri, uint endTime, uint options) external senderIsMember {
        require(options >= 2 && options <= 5, "Number of options can be between 2 and 5.");
        require(endTime > block.timestamp, "The endTime cannot be in the past.");

        uint voteId = nextVoteId;
        votes[voteId].uri = uri;
        votes[voteId].owner = msg.sender;
        votes[voteId].endTime = endTime;
        votes[voteId].votes = new uint[](options);
        votes[voteId].options = options;

        emit VoteCreated(msg.sender, voteId, block.timestamp, endTime);
        nextVoteId++;
    }

    function vote(uint voteId, uint option) external senderIsMember canVote(voteId, option) {
        votes[voteId].voted[msg.sender] = true;
        votes[voteId].votes[option]++;

        emit Voted(msg.sender, voteId, option, block.timestamp);
    }

    function getVote(uint voteId) public view returns(string memory, address, uint[] memory, uint) {
        return (votes[voteId].uri, votes[voteId].owner, votes[voteId].votes, votes[voteId].endTime);
    }

    function didVote(address member, uint voteId) public view returns(bool) {
        return votes[voteId].voted[member];
    }

}
