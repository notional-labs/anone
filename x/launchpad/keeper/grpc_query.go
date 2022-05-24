package keeper

import (
	"context"

	"github.com/notional-labs/anone/x/launchpad/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ types.QueryServer = Querier{}

type Querier struct {
	Keeper
}

func NewQuerier(k Keeper) Querier {
	return Querier{Keeper: k}
}

func (q Querier) Params(ctx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	context := sdk.UnwrapSDKContext(ctx)
	return &types.QueryParamsResponse{Params: q.Keeper.GetParams(context)}, nil
}

func (q Querier) Project(ctx context.Context, req *types.ProjectRequest) (*types.ProjectResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	context := sdk.UnwrapSDKContext(ctx)
	project, err := q.Keeper.GetProjectById(context, req.ProjectId)
	if(err != nil) {
		return nil, err
	}
	return &types.ProjectResponse{Project: &project}, nil
}

func (q Querier) TotalProject(ctx context.Context, req *types.TotalProjectRequest) (*types.TotalProjectResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	context := sdk.UnwrapSDKContext(ctx)
	projectIds, err := q.Keeper.GetAllProjects(context)
	if(err != nil) {
		return nil, err
	}
	return &types.TotalProjectResponse{ProjectsId: projectIds}, nil
}
