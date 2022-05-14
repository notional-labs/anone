package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/launchpad/types"

	"github.com/gogo/protobuf/proto"
)

func (k Keeper) MarshalProject(project types.Project) ([]byte, error) {
	return proto.Marshal(&project)
}

func (k Keeper) UnmarshalProject(bz []byte) (types.Project, error) {
	var acc types.Project
	return acc, proto.Unmarshal(bz, &acc)
}

func (k Keeper) SetProject(ctx sdk.Context, project types.Project) error {
	bz, err := k.MarshalProject(project)
	if err != nil {
		return err
	}

	store := ctx.KVStore(k.storeKey)
	projectKey := types.GetKeyPrefixProject(project.GetProjectId())
	store.Set(projectKey, bz)

	return nil
}

func (k Keeper) DeletePool(ctx sdk.Context, projectID uint64) error {
	store := ctx.KVStore(k.storeKey)
	projectKey := types.GetKeyPrefixProject(projectID)
	if !store.Has(projectKey) {
		return fmt.Errorf("pool with ID %d does not exist", projectKey)
	}

	store.Delete(projectKey)
	return nil
}
