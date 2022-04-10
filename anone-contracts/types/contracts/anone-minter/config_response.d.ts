import { Coin, Timestamp } from "./shared-types";

export interface ConfigResponse {
admin: string
base_token_uri: string
num_tokens: number
per_address_limit: number
an721_address: string
an721_code_id: number
start_time: Timestamp
unit_price: Coin
whitelist?: (string | null)
[k: string]: unknown
}
