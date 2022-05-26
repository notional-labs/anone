<!-- This file is auto-generated. Please do not modify it yourself. -->
# Protobuf Documentation
<a name="top"></a>

## Table of Contents

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

