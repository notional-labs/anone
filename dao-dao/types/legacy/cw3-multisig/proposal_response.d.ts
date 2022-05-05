import { CosmosMsgFor_Empty, Expiration, Status, ThresholdResponse } from "./shared-types";

/**
 * Note, if you are storing custom messages in the proposal, the querier needs to know what possible custom message types those are in order to parse the response
 */
export interface ProposalResponse {
description: string
expires: Expiration
id: number
msgs: CosmosMsgFor_Empty[]
status: Status
/**
 * This is the threshold that is applied to this proposal. Both the rules of the voting contract, as well as the total_weight of the voting group may have changed since this time. That means that the generic `Threshold{}` query does not provide valid information for existing proposals.
 */
threshold: ThresholdResponse
title: string
[k: string]: unknown
}
