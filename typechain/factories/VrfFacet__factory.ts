/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VrfFacet, VrfFacetInterface } from "../VrfFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
    ],
    name: "OpenPortals",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "PortalOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_vrfTimeSet",
        type: "uint256",
      },
    ],
    name: "VrfRandomNumber",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newFee",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_keyHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_vrfCoordinator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_link",
        type: "address",
      },
    ],
    name: "changeVrf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "keyHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "link",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "linkBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "linkBalance_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
    ],
    name: "openPortals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_randomNumber",
        type: "uint256",
      },
    ],
    name: "rawFulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "removeLinkTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vrfCoordinator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611191806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806394985ddd1161005b57806394985ddd146100e8578063a3e56fa8146100fb578063c26ecefa14610103578063e59c2f0c1461010b57610088565b80631c4695f41461008d578063247b30fb146100ab57806361728f39146100c0578063761e99f0146100d5575b600080fd5b61009561011e565b6040516100a29190610dd7565b60405180910390f35b6100be6100b9366004610ca3565b61012e565b005b6100c8610293565b6040516100a29190610ea8565b6100be6100e3366004610c7a565b610299565b6100be6100f6366004610d39565b61032a565b610095610443565b6100c8610452565b6100be610119366004610d72565b6104d8565b6028546001600160a01b03165b90565b600061013861057a565b905060005b8281101561025457600084848381811061016757634e487b7160e01b600052603260045260246000fd5b602090810292909201356000818152600d9093526040909220600a015491925050600160a01b900460ff16156101b85760405162461bcd60e51b81526004016101af90610f2b565b60405180910390fd5b6000818152600d60205260409020600a01546001600160a01b038481169116146101f45760405162461bcd60e51b81526004016101af9061104c565b6000818152600d60205260409020600a0154600160d01b900460ff161561022d5760405162461bcd60e51b81526004016101af906110e0565b610236816105d6565b610241308285610822565b508061024c81611134565b91505061013d565b507fae66efc8f8e0f090cda702f391cb78d98edbc93d662e2876a5c6d6f257d959b98383604051610286929190610e6e565b60405180910390a1505050565b60255490565b6102a161087c565b60285460405163a9059cbb60e01b81526001600160a01b039091169063a9059cbb906102d39085908590600401610deb565b602060405180830381600087803b1580156102ed57600080fd5b505af1158015610301573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103259190610d12565b505050565b6000828152602360205260409020546027546001600160a01b031661034d61057a565b6001600160a01b0316146103735760405162461bcd60e51b81526004016101af906110a9565b6000818152600d60205260409020600a0154600160a01b900460ff166001146103ae5760405162461bcd60e51b81526004016101af90610fa7565b6000818152600d60209081526040808320600a01805460ff60a01b1916600160a11b179055600c9091528082208490555182917fb5824aff6dce0f8d1992635006fca09ed9009a7a4dd0aa2e8678594d87eade7e91a2807f902c3f482303571df54b548cf5ccfab6a428d11d87b142243af064b9fe64e2d48342604051610436929190610db7565b60405180910390a2505050565b6027546001600160a01b031690565b6028546040516370a0823160e01b81526000916001600160a01b0316906370a0823190610483903090600401610dd7565b60206040518083038186803b15801561049b57600080fd5b505afa1580156104af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d39190610d5a565b905090565b6104e061087c565b8315610512576026805471ffffffffffffffffffffffffffffffffffff19166bffffffffffffffffffffffff86161790555b821561051e5760258390555b6001600160a01b0382161561054957602780546001600160a01b0319166001600160a01b0384161790555b6001600160a01b0381161561057457602880546001600160a01b0319166001600160a01b0383161790555b50505050565b6000333014156105d157600080368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b0316915061012b9050565b503390565b6000818152600d602052604090819020600a01805460ff60a01b1916600160a01b17905560265460285491516370a0823160e01b815271ffffffffffffffffffffffffffffffffffff9091169182916001600160a01b03909116906370a0823190610645903090600401610dd7565b60206040518083038186803b15801561065d57600080fd5b505afa158015610671573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106959190610d5a565b10156106b35760405162461bcd60e51b81526004016101af90610f70565b6025546028546027546040516001600160a01b0392831692634000aea092169085906106e6908690600090602001610eb1565b6040516020818303038152906040526040518463ffffffff1660e01b815260040161071393929190610e04565b602060405180830381600087803b15801561072d57600080fd5b505af1158015610741573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107659190610d12565b6107815760405162461bcd60e51b81526004016101af90611015565b60008181526024602090815260408083205490516107a59285928592309201610ec2565b60408051601f19818403018152918152815160209283012060008581526024909352908220805491935090916107da83611134565b9190505550600082826040516020016107f4929190610db7565b60408051601f1981840301815291815281516020928301206000908152602390925290209490945550505050565b600061082c6108c1565b6001600160a01b03808616600090815260398301602090815260408083208884528252808320938716835292905220549091508061086b575050610325565b61087581846108c6565b5050505050565b6108846109dc565b600401546001600160a01b031661089961057a565b6001600160a01b0316146108bf5760405162461bcd60e51b81526004016101af90610ee9565b565b600090565b60006108d06108c1565b600084815260348201602052604090206001810154919250906108f45750506109d8565b60008481526033830160205260409020600881015460ff1615156001148061091f5750600781015415155b1561092c575050506109d8565b60018101546001600160a01b0385811691161461095b5760405162461bcd60e51b81526004016101af90610fde565b60088101805460ff1916600117905560038101546000908152600d8401602052604090819020600a01805460ff60d01b191690556004820154905186917f10e53bca620314e794d61e37932062e81c48e88233765d09da42aeb00ae4dba0916109c691904390610db7565b60405180910390a26108758585610a00565b5050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c90565b6000610a0a6108c1565b60008481526034820160205260409020600181015491925090610a2e5750506109d8565b80548015610a5057600081815260348401602052604090206002808401549101555b60028201548015610a705760008181526034850160205260409020835490555b60008681526033850160209081526040808320600481015484526035880190925291829020915190918891610aa490610dc5565b9081526020016040518091039020541415610af157600284015460048201546000908152603587016020526040908190209051610ae090610dc5565b908152604051908190036020019020555b6000600185018190558085556002909401849055868452603685016020526040909320805490939092508215610b3b57600083815260368601602052604090206002808601549101555b600284015491508115610b5d5760008281526036860160205260409020845490555b50600086815260338501602090815260408083206001600160a01b03891684526037880183528184206004820154855290925291829020915190918891610ba390610dc5565b9081526020016040518091039020541415610c045760028401546001600160a01b0387166000908152603787016020908152604080832060048601548452909152908190209051610bf390610dc5565b908152604051908190036020019020555b6000600185018190558085556002850155600481015460405188917fd309bba073dd463d9d78e92766d06da7cde7d0e6e83149168a7bc913c9ecc44291610c4d91904290610db7565b60405180910390a250505050505050565b80356001600160a01b0381168114610c7557600080fd5b919050565b60008060408385031215610c8c578182fd5b610c9583610c5e565b946020939093013593505050565b60008060208385031215610cb5578182fd5b823567ffffffffffffffff80821115610ccc578384fd5b818501915085601f830112610cdf578384fd5b813581811115610ced578485fd5b8660208083028501011115610d00578485fd5b60209290920196919550909350505050565b600060208284031215610d23578081fd5b81518015158114610d32578182fd5b9392505050565b60008060408385031215610d4b578182fd5b50508035926020909101359150565b600060208284031215610d6b578081fd5b5051919050565b60008060008060808587031215610d87578182fd5b8435935060208501359250610d9e60408601610c5e565b9150610dac60608601610c5e565b905092959194509250565b918252602082015260400190565b651b1a5cdd195960d21b815260060190565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b600060018060a01b038516825260208481840152606060408401528351806060850152825b81811015610e4557858101830151858201608001528201610e29565b81811115610e565783608083870101525b50601f01601f19169290920160800195945050505050565b6020808252810182905260006001600160fb1b03831115610e8d578081fd5b60208302808560408501379190910160400190815292915050565b90815260200190565b91825260ff16602082015260400190565b93845260ff9290921660208401526001600160a01b03166040830152606082015260800190565b60208082526022908201527f4c69624469616d6f6e643a204d75737420626520636f6e7472616374206f776e60408201526132b960f11b606082015260800190565b60208082526025908201527f41617665676f7463686946616365743a20506f7274616c206973206e6f7420636040820152641b1bdcd95960da1b606082015260800190565b60208082526019908201527f56726646616365743a204e6f7420656e6f756768204c494e4b00000000000000604082015260600190565b6020808252601c908201527f56726646616365743a20565246206973206e6f742070656e64696e6700000000604082015260600190565b6020808252601d908201527f4d61726b6574706c6163653a206f776e6572206e6f742073656c6c6572000000604082015260600190565b6020808252601e908201527f56726646616365743a206c696e6b207472616e73666572206661696c65640000604082015260600190565b60208082526038908201527f41617665676f7463686946616365743a204f6e6c792061617665676f7463686960408201527f206f776e65722063616e206f70656e206120706f7274616c0000000000000000606082015260800190565b6020808252601f908201527f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00604082015260600190565b60208082526034908201527f41617665676f7463686946616365743a2043616e2774206f70656e20706f7274604082015273185b081dda195b881a5d081a5cc81b1bd8dad95960621b606082015260800190565b600060001982141561115457634e487b7160e01b81526011600452602481fd5b506001019056fea26469706673582212200e40746387a919fe35894ffd35ae4605727d7e99d5a479121e179125bc2561a964736f6c63430008010033";

export class VrfFacet__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VrfFacet> {
    return super.deploy(overrides || {}) as Promise<VrfFacet>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): VrfFacet {
    return super.attach(address) as VrfFacet;
  }
  connect(signer: Signer): VrfFacet__factory {
    return super.connect(signer) as VrfFacet__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VrfFacetInterface {
    return new utils.Interface(_abi) as VrfFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VrfFacet {
    return new Contract(address, _abi, signerOrProvider) as VrfFacet;
  }
}
