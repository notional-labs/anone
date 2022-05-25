package keeper

import (
	"context"
	"encoding/json"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/notional-labs/anone/x/launchpad/types"
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
	projects := []types.Project{}
	store := context.KVStore(q.Keeper.storeKey)
	valStore := prefix.NewStore(store, types.KeyPrefixProject)


	pageRes, err := query.FilteredPaginate(valStore, req.Pagination, func(key []byte, value []byte, accumulate bool) (bool, error) {
		newProject, err := q.getProjectFromIDJsonBytes(context, value)
		if err != nil {
			panic(err)
		}
		projects = append(projects, newProject...)

		return true, nil
	})

	if err != nil {
		return nil, err
	}
	return &types.TotalProjectResponse{ Projects: projects, Pagination: pageRes}, nil
}

func (q Querier) getProjectFromIDJsonBytes(ctx sdk.Context, refValue []byte) ([]types.Project, error) {
	projects := []types.Project{}
	projectIDs := []uint64{}

	err := json.Unmarshal(refValue, &projectIDs)
	if err != nil {
		return projects, err
	}

	for _, gaugeID := range projectIDs {
		project, _ := q.Keeper.GetProjectById(ctx, gaugeID)
		if (project != types.Project{}) {
			projects = append(projects, project)
		}
	}

	return projects, nil
}
