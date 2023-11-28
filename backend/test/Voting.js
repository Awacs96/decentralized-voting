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

});