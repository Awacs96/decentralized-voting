const { expect } = require("chai");

const getTime = async () => {
  const previousBlockNumber = await ethers.provider.getBlockNumber();
  const previousBlock = await ethers.provider.getBlock(previousBlockNumber);
  return previousBlock.timestamp;
}

describe("Voting", function () {
  let addr0;
  let addr1;
  let votingContract;

  before(async () => {
    [addr0, addr1] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    votingContract = await Voting.deploy({});
  });

  describe("Join", () => {
    it("User can join as a member", async () => {
      await expect(votingContract.join()).to.emit(votingContract, "MemberJoined");
    });

    it("User can not join if it is already a member", async () => {
      await expect(votingContract.join()).to.be.reverted;
    });
  });

  describe("Create vote", () => {
    it("Non-member can not create vote", async () => {
      await expect(votingContract.connect(addr1).createVote("myRandomUri", (await getTime() + 60), 3)).to.be.reverted;
    });

    // VoteId = 0
    it("Member can create vote", async () => {
      await expect(votingContract.createVote("myRandomUri", (await getTime() + 60), 5)).to.emit(votingContract, "VoteCreated");
    });

    it("Member can not create a vote with invalid number", async () => {
      await expect(votingContract.createVote("myRandomUri", (await getTime() - 1), 5)).to.be.reverted;
    });

    it("Member can not create a vote with more than allowed options", async () => {
      await expect(votingContract.createVote("myRandomUri", (await getTime() + 30), 8)).to.be.reverted;
    });

    it("Member can not create a vote with less than allowed options", async () => {
      await expect(votingContract.createVote("myRandomUri", (await getTime() + 30), 1)).to.be.reverted;
    });

    // VodeId = 1; Take a deeper look -> 2 votes with same URI - should be allowed or not?
    it("Member can create a second vote", async () => {
      await expect(votingContract.createVote("myRandomUri", (await getTime() + 30), 4)).to.emit(votingContract, "VoteCreated");
    });
  });

  describe("Vote", () => {
    it("Can not vote if the sender is not a member", async () => {
      await expect(votingContract.connect(addr1).vote(0, 2)).to.be.reverted;
    });

    // We created 2 votes (Id 0 and 1)
    it("Can not vote in a vote that does not exist", async () => {
      await expect(votingContract.vote(2, 2)).to.be.reverted;
    });

    it("Can not vote for an invalid option", async () => {
      await expect(votingContract.vote(1, 4)).to.be.reverted;
    });

    it("Member can vote", async () => {
      await expect(votingContract.vote(1, 2)).to.emit(votingContract, "Voted");
    });

    it("Member can not vote twice in the same vote", async () => {
      await expect(votingContract.vote(1, 3)).to.be.reverted;
    });

    it("Member can not vote on an expired vote", async () => {
      await votingContract.connect(addr1).join();
      await ethers.provider.send("evm_mine", [(await getTime()) + 3600]);
      await expect(votingContract.connect(addr1).vote(1, 2)).to.be.reverted;
    });
  });
});