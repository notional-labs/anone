package keeper

import (
	"context"

	"github.com/notional-labs/anone/x/launchpad/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (server msgServer) CreateProject(ctx context.Context, msg *types.MsgCreateProjectRequest) (*types.MsgCreateProjectResponse, error) {
	// verify signer

	// get ctx SDK context

	// get project id

	// get project address

	// create project data

	// store project data into kv store

	// emit event

	return &types.MsgCreateProjectResponse{}, types.ErrNotImplemented
}

func (server msgServer) DeleteProject(ctx context.Context, msg *types.MsgDeleteProjectRequest) (*types.MsgDeleteProjectResponse, error) {
	return &types.MsgDeleteProjectResponse{}, types.ErrNotImplemented
}

func (server msgServer) ModifyStartTime(ctx context.Context, msg *types.MsgModifyStartTimeRequest) (*types.MsgModifyStartTimeResponse, error) {
	return &types.MsgModifyStartTimeResponse{}, types.ErrNotImplemented
}

func (server msgServer) ModifyProjectInformation(ctx context.Context, msg *types.MsgModifyProjectInformationRequest) (*types.MsgModifyProjectInformationResponse, error) {
	return &types.MsgModifyProjectInformationResponse{}, types.ErrNotImplemented
}
