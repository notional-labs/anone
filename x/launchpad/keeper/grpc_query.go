package keeper

import (
	"context"

	"github.com/notional-labs/anone/x/launchpad/types"
)

var _ types.QueryServer = Querier{}

type Querier struct {
	Keeper
}

func NewQuerier(k Keeper) Querier {
	return Querier{Keeper: k}
}

func (q Querier) Params(ctx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	return &types.QueryParamsResponse{}, types.ErrNotImplemented
}

func (q Querier) Project(ctx context.Context, req *types.ProjectRequest) (*types.ProjectResponse, error) {
	return &types.ProjectResponse{}, types.ErrNotImplemented
}

func (q Querier) TotalProject(ctx context.Context, req *types.TotalProjectRequest) (*types.TotalProjectResponse, error) {
	return &types.TotalProjectResponse{}, types.ErrNotImplemented
}
