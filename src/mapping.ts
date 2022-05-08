import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  ERC20,
} from "../generated/ERC20/ERC20"
import { BlockEntity } from "../generated/schema"

var BIGZERO = new BigInt(0);
var BIGONE = new BigInt(1)

export function getOrCreateDayDate(id: BigInt): BlockEntity {
  const dateTime = new Date(id.toU32());
  const dayDate = dateTime.getUTCDay();
  var result = BlockEntity.load(dayDate.toString());
  
  if (result === null)
  {
    result = new BlockEntity(dayDate.toString());
    result.timestamp = new BigInt(dayDate);
    result.totalFees = new BigInt(0);
    result.save();
  }

  return result;
}

export function handleBlock(block: ethereum.Block): void {

    // create and set new block
    var b = getOrCreateDayDate(block.timestamp);   

    // do math for previous blocks
    (b.totalFees as BigInt).plus(block.gasUsed);

    // save the results.
    b.save();
}
