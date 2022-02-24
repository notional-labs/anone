import { makeSignDoc } from '@cosmjs/amino';
import { sortedJsonStringify } from '../util';

export function makeSignDocJsonString (msgs, fee, chainId, memo, accountNumber, sequence) {
    return sortedJsonStringify(makeSignDoc([msgs], fee, chainId, memo, accountNumber, sequence))
}
