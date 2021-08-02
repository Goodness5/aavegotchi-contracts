/* global describe it before ethers network */
/* eslint prefer-const: "off" */

const {
  upgradePetOperator,
} = require("../scripts/upgrades/upgrade-petOperator.js");
const truffleAssert = require("truffle-assertions");
const { expect } = require("chai");

async function impersonate(address, contract) {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  let signer = await ethers.getSigner(address);
  contract = contract.connect(signer);
  return contract;
}

describe("Testing Pet Operator Upgrade", async function () {
  this.timeout(300000);
  const diamondAddress = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
  let aavegotchiFacet;
  let aavegotchiGameFacet;
  let bridgeFacet;
  let petOperator;
  let firstOwner;
  let secondOwner;
  let thirdOwner;
  let tokenIdOne;
  let tokenIdTwo;
  let tokenIdThree;
  let ghst;

  // this.timeout(300000)
  before(async function () {
    await hre.network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.MATIC_URL,
          },
        },
      ],
    });

    await upgradePetOperator();
    // await network.provider.request({
    //   method: 'hardhat_reset',
    //   params: [{
    //     forking: {
    //       jsonRpcUrl: process.env.MATIC_URL
    //       // blockNumber: 11095000
    //     }
    //   }]
    // })
    ghst = await ethers.getContractAt(
      "IERC20",
      "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7"
    );
    aavegotchiFacet = await ethers.getContractAt(
      "contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet",
      diamondAddress
    );
    aavegotchiGameFacet = await ethers.getContractAt(
      "AavegotchiGameFacet",
      diamondAddress
    );
    bridgeFacet = await ethers.getContractAt(
      "contracts/Aavegotchi/facets/BridgeFacet.sol:BridgeFacet",
      diamondAddress
    );
    tokenIdOne = 9512;
    firstOwner = await aavegotchiFacet.ownerOf(tokenIdOne);
    petOperator = firstOwner;
    tokenIdTwo = 8020;
    secondOwner = await aavegotchiFacet.ownerOf(tokenIdTwo);
    tokenIdThree = 7331;
    thirdOwner = await aavegotchiFacet.ownerOf(tokenIdThree);
  });

  it("Register Pet Operator", async function () {
    aavegotchiFacet = await impersonate(firstOwner, aavegotchiFacet);
    aavegotchiGameFacet = await impersonate(firstOwner, aavegotchiGameFacet);

    const rate = ethers.utils.parseEther("0.3");
    await aavegotchiGameFacet.registerAsPetOperator(
      rate,
      "Coder Dan's Pet Shop",
      "The best petting shop in town"
    );
  });

  it("Transfer Aavegotchi", async function () {
    aavegotchiFacet = await impersonate(firstOwner, aavegotchiFacet);

    expect(firstOwner).to.not.equal(secondOwner);
    const tx = await aavegotchiFacet.transferFrom(
      firstOwner,
      secondOwner,
      tokenIdOne
    );

    const receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Transfer failed: ${tx.hash}`);
    }

    expect(await aavegotchiFacet.ownerOf(tokenIdOne)).to.equal(secondOwner);
  });

  it("Only owner can set Pet Operator", async function () {
    aavegotchiGameFacet = await impersonate(thirdOwner, aavegotchiGameFacet);

    await truffleAssert.reverts(
      aavegotchiGameFacet.setPetOperator(petOperator, [tokenIdOne]),
      "AavegotchiGameFacet: Must be owner to set petter"
    );
  });

  it("Should set Pet Operator", async function () {
    aavegotchiGameFacet = await impersonate(secondOwner, aavegotchiGameFacet);

    const tx = await aavegotchiGameFacet.setPetOperator(petOperator, [
      tokenIdOne /*tokenIdTwo*/,
    ]);
    const receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Transaction failed: ${tx.hash}`);
    }

    const tokenIds = (
      await aavegotchiGameFacet.petOperatorTokenIds(petOperator)
    ).map((x) => x.toNumber());
    expect(tokenIds).to.have.members([tokenIdOne /*, tokenIdTwo*/]);
  });

  it("Pet Operator should pet Aavegotchis and deduct funds from Owner", async function () {
    aavegotchiGameFacet = await impersonate(petOperator, aavegotchiGameFacet);

    const details = await aavegotchiGameFacet.petOperatorInfo(petOperator);

    const petRate = details.rate_;

    expect(petRate).to.equal(ethers.utils.parseEther("0.3"));

    // console.log('pet rate:',petRate.toString())

    let petOperatorShare = ethers.BigNumber.from(
      ethers.utils.parseEther("0.21")
    );
    let pixelcraftShare = ethers.BigNumber.from(ethers.utils.parseEther("0.9"));

    // console.log('pet op share:',petOperatorShare.toString())
    // console.log('pc share:',pixelcraftShare.toString())

    let operatorOldBal = ethers.BigNumber.from(
      await ghst.balanceOf(petOperator)
    );
    let ownerOldBal = ethers.BigNumber.from(await ghst.balanceOf(secondOwner));

    // console.log('operator old bal:',operatorOldBal.toString())
    // console.log('old bal:',ownerOldBal.toString())

    let beforePetAavegotchi = await aavegotchiFacet.getAavegotchi(tokenIdOne);

    const tx = await aavegotchiGameFacet.pet();

    let afterPetAavegotchi = await aavegotchiFacet.getAavegotchi(tokenIdOne);
    expect(afterPetAavegotchi.kinship).to.gt(beforePetAavegotchi.kinship);

    const receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Transaction failed: ${tx.hash}`);
    }
    let operatorNewBal = ethers.BigNumber.from(
      await ghst.balanceOf(petOperator)
    );
    let ownerNewBal = ethers.BigNumber.from(await ghst.balanceOf(secondOwner));

    // console.log("owner new bal:", ownerNewBal.toString());
    // console.log("operator new bal:", operatorNewBal.toString());

    //The operator earns 0.2 GHST per Pet. Two gotchis were pet
    expect(operatorNewBal).to.equal(operatorOldBal.add(petOperatorShare));

    //The Owner spends 0.3 GHST per pet
    expect(ownerNewBal).to.equal(ownerOldBal.sub(petRate));
  });

  it("Should not charge the owner if Pet within 12 hrs", async function () {
    aavegotchiGameFacet = await impersonate(petOperator, aavegotchiGameFacet);

    let operatorOldBal = ethers.BigNumber.from(
      await ghst.balanceOf(petOperator)
    );
    let ownerOldBal = ethers.BigNumber.from(await ghst.balanceOf(secondOwner));

    const tx = await aavegotchiGameFacet.pet();

    const receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Transaction failed: ${tx.hash}`);
    }

    let operatorNewBal = ethers.BigNumber.from(
      await ghst.balanceOf(firstOwner)
    );
    let ownerNewBal = ethers.BigNumber.from(await ghst.balanceOf(secondOwner));

    //The operator earns 0.2 GHST per Pet
    expect(operatorNewBal).to.equal(operatorOldBal);

    //The Owner spends 0.3 GHST per pet
    expect(ownerNewBal).to.equal(ownerOldBal);
  });

  it("Cannot change rate if Aavegotchis are being managed", async function () {
    aavegotchiGameFacet = await impersonate(petOperator, aavegotchiGameFacet);

    let details = await aavegotchiGameFacet.petOperatorInfo(petOperator);

    // console.log("details:", details);

    expect(details.rate_).to.equal(ethers.utils.parseEther("0.3"));

    const rate = ethers.utils.parseEther("0.5");
    await truffleAssert.reverts(
      aavegotchiGameFacet.registerAsPetOperator(
        rate,
        "Coder Dan's Pet Shop",
        "The best petting shop in town"
      ),
      "AavegotchiGameFacet: Cannot update Pet Operator information with managed Aavegotchis"
    );

    details = await aavegotchiGameFacet.petOperatorInfo(petOperator);

    // console.log("details:", details);

    expect(details.rate_).to.equal(ethers.utils.parseEther("0.3"));
  });

  it("Remove pet operator by transfer", async function () {
    const tokenIds = (
      await aavegotchiGameFacet.petOperatorTokenIds(petOperator)
    ).map((x) => x.toNumber());
    expect(tokenIds).to.have.members([tokenIdOne /*tokenIdTwo*/]);

    const currentPetOperator = await aavegotchiGameFacet.petOperator(
      tokenIdOne
    );

    expect(currentPetOperator).to.equal(petOperator);

    aavegotchiFacet = await impersonate(secondOwner, aavegotchiFacet);

    const tx = await aavegotchiFacet.transferFrom(
      secondOwner,
      thirdOwner,
      tokenIdOne
    );

    const receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Transaction failed: ${tx.hash}`);
    }
    const newTokenIds = (
      await aavegotchiGameFacet.petOperatorTokenIds(petOperator)
    ).map((x) => x.toNumber());
    expect(newTokenIds).to.have.members([
      /*tokenIdTwo*/
    ]);

    const newPetOperator = await aavegotchiGameFacet.petOperator(tokenIdOne);

    expect(newPetOperator).to.equal(ethers.constants.AddressZero);
  });

  /*
  it('Bridging Aavegotchi does not change the pet operator ', async function () {
    const currentPetOperator = await aavegotchiGameFacet.petOperator(tokenIdTwo)

    expect(currentPetOperator).to.equal(petOperator)

    bridgeFacet = await impersonate(secondOwner, bridgeFacet)

    const tx = await bridgeFacet.withdrawAavegotchiBatch([tokenIdTwo])
 
    const receipt = await tx.wait()
    if (!receipt.status) {
      throw Error(`Transaction failed: ${tx.hash}`)
    }
    const newPetOperator = await aavegotchiGameFacet.petOperator(tokenIdTwo)

    expect(newPetOperator).to.equal(petOperator)

    expect(await aavegotchiFacet.ownerOf(tokenIdTwo)).to.equal(diamondAddress)
  })
  */

  /*
  it('Remove pet operator', async function () {
    aavegotchiGameFacet = await impersonate(firstOwner, aavegotchiGameFacet)

    const tokenIds = (await aavegotchiGameFacet.petOperatorTokenIds(firstOwner)).map(x => x.toNumber())
    expect(tokenIds).to.have.members([tokenIdOne])

    expect(await aavegotchiGameFacet.petOperator(tokenIdOne)).to.equal(firstOwner)

    const tx = await aavegotchiGameFacet.removePetOperator([tokenIdOne])

    const receipt = await tx.wait()
    if (!receipt.status) {
      throw Error(`Transaction failed: ${tx.hash}`)
    }

    const newTokenIds = (await aavegotchiGameFacet.petOperatorTokenIds(firstOwner)).map(x => x.toNumber())
    expect(newTokenIds).to.have.members([])

    expect(await aavegotchiGameFacet.petOperator(tokenIdOne)).to.equal(ethers.constants.AddressZero)
  })
  */
});
