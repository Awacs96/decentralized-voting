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

    event X ();


}