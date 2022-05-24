<!-- This file is auto-generated. Please do not modify it yourself. -->
# Protobuf Documentation
<a name="top"></a>

## Table of Contents

- [claims/claim_record.proto](#claims/claim_record.proto)
    - [ClaimRecord](#notionallabs.anone.claims.ClaimRecord)
  
    - [Action](#notionallabs.anone.claims.Action)
  
- [claims/params.proto](#claims/params.proto)
    - [ClaimAuthorization](#notionallabs.anone.claims.ClaimAuthorization)
    - [Params](#notionallabs.anone.claims.Params)
    - [Params.ActionPercentageEntry](#notionallabs.anone.claims.Params.ActionPercentageEntry)
  
- [claims/genesis.proto](#claims/genesis.proto)
    - [GenesisState](#notionallabs.anone.claims.GenesisState)
  
- [claims/query.proto](#claims/query.proto)
    - [QueryClaimRecordRequest](#notionallabs.anone.claims.QueryClaimRecordRequest)
    - [QueryClaimRecordResponse](#notionallabs.anone.claims.QueryClaimRecordResponse)
    - [QueryClaimableForActionRequest](#notionallabs.anone.claims.QueryClaimableForActionRequest)
    - [QueryClaimableForActionResponse](#notionallabs.anone.claims.QueryClaimableForActionResponse)
    - [QueryModuleAccountBalanceRequest](#notionallabs.anone.claims.QueryModuleAccountBalanceRequest)
    - [QueryModuleAccountBalanceResponse](#notionallabs.anone.claims.QueryModuleAccountBalanceResponse)
    - [QueryParamsRequest](#notionallabs.anone.claims.QueryParamsRequest)
    - [QueryParamsResponse](#notionallabs.anone.claims.QueryParamsResponse)
    - [QueryTotalClaimableRequest](#notionallabs.anone.claims.QueryTotalClaimableRequest)
    - [QueryTotalClaimableResponse](#notionallabs.anone.claims.QueryTotalClaimableResponse)
  
    - [Query](#notionallabs.anone.claims.Query)
  
- [claims/tx.proto](#claims/tx.proto)
    - [MsgClaimFor](#notionallabs.anone.claims.MsgClaimFor)
    - [MsgClaimForResponse](#notionallabs.anone.claims.MsgClaimForResponse)
    - [MsgInitialClaim](#notionallabs.anone.claims.MsgInitialClaim)
    - [MsgInitialClaimResponse](#notionallabs.anone.claims.MsgInitialClaimResponse)
  
    - [Msg](#notionallabs.anone.claims.Msg)
  
- [Scalar Value Types](#scalar-value-types)



<a name="claims/claim_record.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## claims/claim_record.proto



<a name="notionallabs.anone.claims.ClaimRecord"></a>

### ClaimRecord



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address of claim user |
| `initial_claimable_amount` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | total initial claimable amount for the user |
| `action_completed` | [bool](#bool) | repeated | true if action is completed index of bool in array refers to action enum # |





 <!-- end messages -->


<a name="notionallabs.anone.claims.Action"></a>

### Action


| Name | Number | Description |
| ---- | ------ | ----------- |
| ActionInitialClaim | 0 |  |
| ActionMintNFT | 1 |  |
| ActionVote | 2 |  |
| ActionDelegateStake | 3 |  |


 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="claims/params.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## claims/params.proto



<a name="notionallabs.anone.claims.ClaimAuthorization"></a>

### ClaimAuthorization



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `contract_address` | [string](#string) |  |  |
| `action` | [Action](#notionallabs.anone.claims.Action) |  |  |






<a name="notionallabs.anone.claims.Params"></a>

### Params
Params defines the parameters for the module.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `airdrop_enabled` | [bool](#bool) |  |  |
| `airdrop_start_time` | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  |  |
| `duration_until_decay` | [google.protobuf.Duration](#google.protobuf.Duration) |  |  |
| `duration_of_decay` | [google.protobuf.Duration](#google.protobuf.Duration) |  |  |
| `claim_denom` | [string](#string) |  | denom of claimable asset |
| `allowed_claimers` | [ClaimAuthorization](#notionallabs.anone.claims.ClaimAuthorization) | repeated | list of contracts and their allowed claim actions |
| `action_percentage` | [Params.ActionPercentageEntry](#notionallabs.anone.claims.Params.ActionPercentageEntry) | repeated |  |






<a name="notionallabs.anone.claims.Params.ActionPercentageEntry"></a>

### Params.ActionPercentageEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `key` | [string](#string) |  |  |
| `value` | [uint32](#uint32) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="claims/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## claims/genesis.proto



<a name="notionallabs.anone.claims.GenesisState"></a>

### GenesisState
GenesisState defines the claims module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `module_account_balance` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) |  | this line is used by starport scaffolding # genesis/proto/state balance of the claim module's account |
| `params` | [Params](#notionallabs.anone.claims.Params) |  | params defines all the parameters of the module. |
| `claim_records` | [ClaimRecord](#notionallabs.anone.claims.ClaimRecord) | repeated | list of claim records, one for every airdrop recipient |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="claims/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## claims/query.proto



<a name="notionallabs.anone.claims.QueryClaimRecordRequest"></a>

### QueryClaimRecordRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  |  |






<a name="notionallabs.anone.claims.QueryClaimRecordResponse"></a>

### QueryClaimRecordResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `claim_record` | [ClaimRecord](#notionallabs.anone.claims.ClaimRecord) |  |  |






<a name="notionallabs.anone.claims.QueryClaimableForActionRequest"></a>

### QueryClaimableForActionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  |  |
| `action` | [Action](#notionallabs.anone.claims.Action) |  |  |






<a name="notionallabs.anone.claims.QueryClaimableForActionResponse"></a>

### QueryClaimableForActionResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `coins` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated |  |






<a name="notionallabs.anone.claims.QueryModuleAccountBalanceRequest"></a>

### QueryModuleAccountBalanceRequest
QueryParamsRequest is the request type for the Query/Params RPC method.






<a name="notionallabs.anone.claims.QueryModuleAccountBalanceResponse"></a>

### QueryModuleAccountBalanceResponse
QueryParamsResponse is the response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `moduleAccountBalance` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | params defines the parameters of the module. |






<a name="notionallabs.anone.claims.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest is the request type for the Query/Params RPC method.






<a name="notionallabs.anone.claims.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse is the response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#notionallabs.anone.claims.Params) |  | params defines the parameters of the module. |






<a name="notionallabs.anone.claims.QueryTotalClaimableRequest"></a>

### QueryTotalClaimableRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  |  |






<a name="notionallabs.anone.claims.QueryTotalClaimableResponse"></a>

### QueryTotalClaimableResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `coins` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="notionallabs.anone.claims.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `ModuleAccountBalance` | [QueryModuleAccountBalanceRequest](#notionallabs.anone.claims.QueryModuleAccountBalanceRequest) | [QueryModuleAccountBalanceResponse](#notionallabs.anone.claims.QueryModuleAccountBalanceResponse) | this line is used by starport scaffolding # 2 | GET|/anone/claim/module_account_balance|
| `Params` | [QueryParamsRequest](#notionallabs.anone.claims.QueryParamsRequest) | [QueryParamsResponse](#notionallabs.anone.claims.QueryParamsResponse) |  | GET|/anone/claim/params|
| `ClaimRecord` | [QueryClaimRecordRequest](#notionallabs.anone.claims.QueryClaimRecordRequest) | [QueryClaimRecordResponse](#notionallabs.anone.claims.QueryClaimRecordResponse) |  | GET|/anone/claim/claim_record/{address}|
| `ClaimableForAction` | [QueryClaimableForActionRequest](#notionallabs.anone.claims.QueryClaimableForActionRequest) | [QueryClaimableForActionResponse](#notionallabs.anone.claims.QueryClaimableForActionResponse) |  | GET|/anone/claim/claimable_for_action/{address}/{action}|
| `TotalClaimable` | [QueryTotalClaimableRequest](#notionallabs.anone.claims.QueryTotalClaimableRequest) | [QueryTotalClaimableResponse](#notionallabs.anone.claims.QueryTotalClaimableResponse) |  | GET|/anone/claim/total_claimable/{address}|

 <!-- end services -->



<a name="claims/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## claims/tx.proto



<a name="notionallabs.anone.claims.MsgClaimFor"></a>

### MsgClaimFor



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  |  |
| `address` | [string](#string) |  |  |
| `action` | [Action](#notionallabs.anone.claims.Action) |  |  |






<a name="notionallabs.anone.claims.MsgClaimForResponse"></a>

### MsgClaimForResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  |  |
| `claimed_amount` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | total initial claimable amount for the user |






<a name="notionallabs.anone.claims.MsgInitialClaim"></a>

### MsgInitialClaim



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  |  |






<a name="notionallabs.anone.claims.MsgInitialClaimResponse"></a>

### MsgInitialClaimResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `claimed_amount` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | total initial claimable amount for the user |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="notionallabs.anone.claims.Msg"></a>

### Msg
Msg defines the Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `InitialClaim` | [MsgInitialClaim](#notionallabs.anone.claims.MsgInitialClaim) | [MsgInitialClaimResponse](#notionallabs.anone.claims.MsgInitialClaimResponse) |  | |
| `ClaimFor` | [MsgClaimFor](#notionallabs.anone.claims.MsgClaimFor) | [MsgClaimForResponse](#notionallabs.anone.claims.MsgClaimForResponse) | this line is used by starport scaffolding # proto/tx/rpc | |

 <!-- end services -->



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

