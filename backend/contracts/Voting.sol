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


}
