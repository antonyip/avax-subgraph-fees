import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  ERC20,
} from "../generated/ERC20/ERC20"
import { BlockEntity } from "../generated/schema"

var BIGZERO = new BigInt(0);
var BIGONE = new BigInt(1)

export function getOrCreateBlock(id: string): BlockEntity {
  var result = BlockEntity.load(id);
  if (result === null)
  {
    result = BlockEntity.load('0');
  }

  if (result === null)
  {
    result = new BlockEntity('0');
    result.timestamp = new BigInt(0);
    result.save();
  }

  return result;
}

export function handleBlock(block: ethereum.Block): void {
  var b = getOrCreateBlock(block.number.toString());
  var bPrev = getOrCreateBlock(block.number.minus(BIGONE).toString());
  b.timestamp = block.timestamp;
  b.prevtimestamp = bPrev.timestamp;
  b.diff = b.timestamp.minus(bPrev.timestamp);
  b.save();
}
