<!-- This file is auto-generated. Please do not modify it yourself. -->
# Protobuf Documentation
<a name="top"></a>

## Table of Contents

- [claims/claim_record.proto](#claims/claim_record.proto)
    - [ClaimRecord](#notionallabs.anone.claims.ClaimRecord)
  
    - [Action](#notionallabs.anone.claims.Action)
    - [ActionPercentage](#notionallabs.anone.claims.ActionPercentage)
  
- [claims/params.proto](#claims/params.proto)
    - [ClaimAuthorization](#notionallabs.anone.claims.ClaimAuthorization)
    - [Params](#notionallabs.anone.claims.Params)
  
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
  
- [ico/params.proto](#ico/params.proto)
    - [Params](#notionallabs.anone.ico.Params)
  
- [ico/genesis.proto](#ico/genesis.proto)
    - [GenesisState](#notionallabs.anone.ico.GenesisState)
  
- [ico/ico.proto](#ico/ico.proto)
    - [ICO](#notionallabs.anone.ico.ICO)
  
- [ico/query.proto](#ico/query.proto)
    - [ICORequest](#notionallabs.anone.ico.ICORequest)
    - [ICOResponse](#notionallabs.anone.ico.ICOResponse)
    - [QueryParamsRequest](#notionallabs.anone.ico.QueryParamsRequest)
    - [QueryParamsResponse](#notionallabs.anone.ico.QueryParamsResponse)
  
    - [Query](#notionallabs.anone.ico.Query)
  
- [ico/tx.proto](#ico/tx.proto)
    - [MessageAddDistributionTokenRequest](#notionallabs.anone.ico.MessageAddDistributionTokenRequest)
    - [MessageAddDistributionTokenResponse](#notionallabs.anone.ico.MessageAddDistributionTokenResponse)
    - [MessageCommitParticipationRequest](#notionallabs.anone.ico.MessageCommitParticipationRequest)
    - [MessageCommitParticipationResponse](#notionallabs.anone.ico.MessageCommitParticipationResponse)
    - [MessageEnableICORequest](#notionallabs.anone.ico.MessageEnableICORequest)
    - [MessageEnableICOResponse](#notionallabs.anone.ico.MessageEnableICOResponse)
    - [MessageModifyTokenListingPriceRequest](#notionallabs.anone.ico.MessageModifyTokenListingPriceRequest)
    - [MessageModifyTokenListingPriceResponse](#notionallabs.anone.ico.MessageModifyTokenListingPriceResponse)
  
    - [Msg](#notionallabs.anone.ico.Msg)
  
- [launchpad/params.proto](#launchpad/params.proto)
    - [Params](#notionallabs.anone.launchpad.Params)
  
- [launchpad/project.proto](#launchpad/project.proto)
    - [Project](#notionallabs.anone.launchpad.Project)
  
- [launchpad/genesis.proto](#launchpad/genesis.proto)
    - [GenesisState](#notionallabs.anone.launchpad.GenesisState)
  
- [launchpad/query.proto](#launchpad/query.proto)
    - [ProjectRequest](#notionallabs.anone.launchpad.ProjectRequest)
    - [ProjectResponse](#notionallabs.anone.launchpad.ProjectResponse)
    - [QueryParamsRequest](#notionallabs.anone.launchpad.QueryParamsRequest)
    - [QueryParamsResponse](#notionallabs.anone.launchpad.QueryParamsResponse)
    - [TotalProjectRequest](#notionallabs.anone.launchpad.TotalProjectRequest)
    - [TotalProjectResponse](#notionallabs.anone.launchpad.TotalProjectResponse)
  
    - [Query](#notionallabs.anone.launchpad.Query)
  
- [launchpad/tx.proto](#launchpad/tx.proto)
    - [MsgCreateProjectRequest](#notionallabs.anone.launchpad.MsgCreateProjectRequest)
    - [MsgCreateProjectResponse](#notionallabs.anone.launchpad.MsgCreateProjectResponse)
    - [MsgDeleteProjectRequest](#notionallabs.anone.launchpad.MsgDeleteProjectRequest)
    - [MsgDeleteProjectResponse](#notionallabs.anone.launchpad.MsgDeleteProjectResponse)
    - [MsgModifyProjectInformationRequest](#notionallabs.anone.launchpad.MsgModifyProjectInformationRequest)
    - [MsgModifyProjectInformationResponse](#notionallabs.anone.launchpad.MsgModifyProjectInformationResponse)
    - [MsgModifyStartTimeRequest](#notionallabs.anone.launchpad.MsgModifyStartTimeRequest)
    - [MsgModifyStartTimeResponse](#notionallabs.anone.launchpad.MsgModifyStartTimeResponse)
  
    - [Msg](#notionallabs.anone.launchpad.Msg)
  
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



<a name="notionallabs.anone.claims.ActionPercentage"></a>

### ActionPercentage


| Name | Number | Description |
| ---- | ------ | ----------- |
| NONE | 0 |  |
| ActionInitialClaim_ | 10 |  |
| ActionMintNFT_ | 50 |  |
| ActionVote_ | 20 |  |
| ActionDelegateStake_ | 20 |  |


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



<a name="ico/params.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ico/params.proto



<a name="notionallabs.anone.ico.Params"></a>

### Params
Params defines the parameters for the module.





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ico/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ico/genesis.proto



<a name="notionallabs.anone.ico.GenesisState"></a>

### GenesisState
GenesisState defines the ico module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#notionallabs.anone.ico.Params) |  | this line is used by starport scaffolding # genesis/proto/state |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ico/ico.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ico/ico.proto



<a name="notionallabs.anone.ico.ICO"></a>

### ICO



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `project_id` | [uint64](#uint64) |  | Project unique id of each project |
| `token_for_distribution` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated |  |
| `distributed_amount` | [string](#string) |  |  |
| `token_listing_price` | [string](#string) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ico/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ico/query.proto



<a name="notionallabs.anone.ico.ICORequest"></a>

### ICORequest
====== ICO


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `project_id` | [uint64](#uint64) |  | Project unique id of each project |






<a name="notionallabs.anone.ico.ICOResponse"></a>

### ICOResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `ico` | [ICO](#notionallabs.anone.ico.ICO) |  |  |






<a name="notionallabs.anone.ico.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest is request type for the Query/Params RPC method.






<a name="notionallabs.anone.ico.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse is response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#notionallabs.anone.ico.Params) |  | params holds all the parameters of this module. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="notionallabs.anone.ico.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Params` | [QueryParamsRequest](#notionallabs.anone.ico.QueryParamsRequest) | [QueryParamsResponse](#notionallabs.anone.ico.QueryParamsResponse) | Parameters queries the parameters of the module. | GET|/notional-labs/anone/ico/params|
| `ICO` | [ICORequest](#notionallabs.anone.ico.ICORequest) | [ICOResponse](#notionallabs.anone.ico.ICOResponse) |  | GET|/notional-labs/anone/ico/{project_id}|

 <!-- end services -->



<a name="ico/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ico/tx.proto



<a name="notionallabs.anone.ico.MessageAddDistributionTokenRequest"></a>

### MessageAddDistributionTokenRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `owner` | [string](#string) |  |  |
| `project_id` | [uint64](#uint64) |  | Project unique id of each project |
| `token_for_distribution` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated |  |






<a name="notionallabs.anone.ico.MessageAddDistributionTokenResponse"></a>

### MessageAddDistributionTokenResponse







<a name="notionallabs.anone.ico.MessageCommitParticipationRequest"></a>

### MessageCommitParticipationRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `participant` | [string](#string) |  |  |
| `token_commit` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated |  |






<a name="notionallabs.anone.ico.MessageCommitParticipationResponse"></a>

### MessageCommitParticipationResponse







<a name="notionallabs.anone.ico.MessageEnableICORequest"></a>

### MessageEnableICORequest
====== MessageEnableICO


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `owner` | [string](#string) |  |  |
| `project_id` | [uint64](#uint64) |  | Project unique id of each project |
| `token_for_distribution` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated |  |
| `token_listing_price` | [string](#string) |  |  |






<a name="notionallabs.anone.ico.MessageEnableICOResponse"></a>

### MessageEnableICOResponse







<a name="notionallabs.anone.ico.MessageModifyTokenListingPriceRequest"></a>

### MessageModifyTokenListingPriceRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `owner` | [string](#string) |  |  |
| `project_id` | [uint64](#uint64) |  | Project unique id of each project |
| `token_listing_price` | [string](#string) |  |  |






<a name="notionallabs.anone.ico.MessageModifyTokenListingPriceResponse"></a>

### MessageModifyTokenListingPriceResponse






 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="notionallabs.anone.ico.Msg"></a>

### Msg
Msg defines the Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `EnableICO` | [MessageEnableICORequest](#notionallabs.anone.ico.MessageEnableICORequest) | [MessageEnableICOResponse](#notionallabs.anone.ico.MessageEnableICOResponse) |  | |
| `AddDistributionToken` | [MessageAddDistributionTokenRequest](#notionallabs.anone.ico.MessageAddDistributionTokenRequest) | [MessageAddDistributionTokenResponse](#notionallabs.anone.ico.MessageAddDistributionTokenResponse) |  | |
| `ModifyTokenListingPrice` | [MessageModifyTokenListingPriceRequest](#notionallabs.anone.ico.MessageModifyTokenListingPriceRequest) | [MessageModifyTokenListingPriceResponse](#notionallabs.anone.ico.MessageModifyTokenListingPriceResponse) |  | |
| `CommitParticipation` | [MessageCommitParticipationRequest](#notionallabs.anone.ico.MessageCommitParticipationRequest) | [MessageCommitParticipationResponse](#notionallabs.anone.ico.MessageCommitParticipationResponse) |  | |

 <!-- end services -->



<a name="launchpad/params.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## launchpad/params.proto



<a name="notionallabs.anone.launchpad.Params"></a>

### Params
Params defines the parameters for the module.





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="launchpad/project.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## launchpad/project.proto



<a name="notionallabs.anone.launchpad.Project"></a>

### Project



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `project_owner` | [string](#string) |  | Project owner |
| `project_title` | [string](#string) |  | Project title |
| `project_id` | [uint64](#uint64) |  | Project unique id of each project (incremental from 1) |
| `project_address` | [string](#string) |  | Project address to store assets |
| `project_active` | [bool](#bool) |  | Whether project is already active |
| `project_information` | [string](#string) |  | Project information |
| `start_time` | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  | Begin time for a project |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="launchpad/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## launchpad/genesis.proto



<a name="notionallabs.anone.launchpad.GenesisState"></a>

### GenesisState
GenesisState defines the launchpad module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#notionallabs.anone.launchpad.Params) |  | this line is used by starport scaffolding # genesis/proto/state |
| `projects` | [Project](#notionallabs.anone.launchpad.Project) | repeated | initial Project at genesis |
| `global_project_id_start` | [uint64](#uint64) |  | global project id. The start of global project id will start from the number of project at genesis. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="launchpad/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## launchpad/query.proto



<a name="notionallabs.anone.launchpad.ProjectRequest"></a>

### ProjectRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `project_id` | [uint64](#uint64) |  |  |






<a name="notionallabs.anone.launchpad.ProjectResponse"></a>

### ProjectResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `project` | [Project](#notionallabs.anone.launchpad.Project) |  |  |






<a name="notionallabs.anone.launchpad.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest is request type for the Query/Params RPC method.






<a name="notionallabs.anone.launchpad.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse is response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#notionallabs.anone.launchpad.Params) |  | params holds all the parameters of this module. |






<a name="notionallabs.anone.launchpad.TotalProjectRequest"></a>

### TotalProjectRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |






<a name="notionallabs.anone.launchpad.TotalProjectResponse"></a>

### TotalProjectResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `projects_id` | [uint64](#uint64) | repeated |  |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="notionallabs.anone.launchpad.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Params` | [QueryParamsRequest](#notionallabs.anone.launchpad.QueryParamsRequest) | [QueryParamsResponse](#notionallabs.anone.launchpad.QueryParamsResponse) | Parameters queries the parameters of the module. | GET|/nebula/launchpad/params|
| `Project` | [ProjectRequest](#notionallabs.anone.launchpad.ProjectRequest) | [ProjectResponse](#notionallabs.anone.launchpad.ProjectResponse) |  | GET|/nebula/launchpad/project/{project_id}|
| `TotalProject` | [TotalProjectRequest](#notionallabs.anone.launchpad.TotalProjectRequest) | [TotalProjectResponse](#notionallabs.anone.launchpad.TotalProjectResponse) |  | GET|/nebula/launchpad/projects|

 <!-- end services -->



<a name="launchpad/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## launchpad/tx.proto



<a name="notionallabs.anone.launchpad.MsgCreateProjectRequest"></a>

### MsgCreateProjectRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `owner` | [string](#string) |  | owner of this project |
| `project_title` | [string](#string) |  | the title of project |
| `project_information` | [string](#string) |  | Project information |
| `start_time` | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  | Begin time for a project |






<a name="notionallabs.anone.launchpad.MsgCreateProjectResponse"></a>

### MsgCreateProjectResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `project_id` | [uint64](#uint64) |  |  |






<a name="notionallabs.anone.launchpad.MsgDeleteProjectRequest"></a>

### MsgDeleteProjectRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `owner` | [string](#string) |  | owner of this project |
| `project_id` | [uint64](#uint64) |  |  |






<a name="notionallabs.anone.launchpad.MsgDeleteProjectResponse"></a>

### MsgDeleteProjectResponse







<a name="notionallabs.anone.launchpad.MsgModifyProjectInformationRequest"></a>

### MsgModifyProjectInformationRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `owner` | [string](#string) |  | owner of this project |
| `project_id` | [uint64](#uint64) |  |  |
| `project_information` | [string](#string) |  | Project information |






<a name="notionallabs.anone.launchpad.MsgModifyProjectInformationResponse"></a>

### MsgModifyProjectInformationResponse







<a name="notionallabs.anone.launchpad.MsgModifyStartTimeRequest"></a>

### MsgModifyStartTimeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `owner` | [string](#string) |  | owner of this project |
| `project_id` | [uint64](#uint64) |  |  |
| `start_time` | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  | Begin time for a project |






<a name="notionallabs.anone.launchpad.MsgModifyStartTimeResponse"></a>

### MsgModifyStartTimeResponse






 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="notionallabs.anone.launchpad.Msg"></a>

### Msg
Msg defines the Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `CreateProject` | [MsgCreateProjectRequest](#notionallabs.anone.launchpad.MsgCreateProjectRequest) | [MsgCreateProjectResponse](#notionallabs.anone.launchpad.MsgCreateProjectResponse) |  | |
| `DeleteProject` | [MsgDeleteProjectRequest](#notionallabs.anone.launchpad.MsgDeleteProjectRequest) | [MsgDeleteProjectResponse](#notionallabs.anone.launchpad.MsgDeleteProjectResponse) |  | |
| `ModifyStartTime` | [MsgModifyStartTimeRequest](#notionallabs.anone.launchpad.MsgModifyStartTimeRequest) | [MsgModifyStartTimeResponse](#notionallabs.anone.launchpad.MsgModifyStartTimeResponse) |  | |
| `ModifyProjectInformation` | [MsgModifyProjectInformationRequest](#notionallabs.anone.launchpad.MsgModifyProjectInformationRequest) | [MsgModifyProjectInformationResponse](#notionallabs.anone.launchpad.MsgModifyProjectInformationResponse) |  | |

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

