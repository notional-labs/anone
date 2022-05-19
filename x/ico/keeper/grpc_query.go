package keeper

import (
	"context"

	"github.com/notional-labs/anone/x/ico/types"
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

func (q Querier) ICO(ctx context.Context, req *types.ICORequest) (*types.ICOResponse, error) {
	return &types.ICOResponse{}, types.ErrNotImplemented
}
