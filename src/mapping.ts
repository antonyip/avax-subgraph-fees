import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  ERC20,
} from "../generated/ERC20/ERC20"
import { BlockEntity } from "../generated/schema"

var prevBlockTimestamp = new BigInt(0);

export function handleBlock(block: ethereum.Block): void {
  var b = new BlockEntity(block.number.toString());
  b.timestamp = block.timestamp;
  b.prevtimestamp = prevBlockTimestamp;
  prevBlockTimestamp = b.timestamp;
  b.diff = b.timestamp.minus(b.prevtimestamp);
  b.save();
}
