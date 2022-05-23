package keeper

import (
	"fmt"

	gogotypes "github.com/gogo/protobuf/types"
	"github.com/notional-labs/anone/v043_temp/address"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/notional-labs/anone/x/launchpad/types"
)

type (
	Keeper struct {
		cdc        codec.BinaryCodec
		storeKey   sdk.StoreKey
		paramstore paramtypes.Subspace
		hooks      types.LaunchpadHooks

		accountKeeper types.AccountKeeper
		bankKeeper types.BankKeeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey sdk.StoreKey,
	ps paramtypes.Subspace,
	accountKeeper types.AccountKeeper,
) *Keeper {
	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:           cdc,
		storeKey:      storeKey,
		paramstore:    ps,
		accountKeeper: accountKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetModuleAccountAddress gets the address of module account
func (k Keeper) GetModuleAccountAddress(ctx sdk.Context) sdk.AccAddress {
	return k.accountKeeper.GetModuleAddress(types.ModuleName)
}

// ============ Project Helper Logic

// GetNextProjectIDAndIncrement returns the next project id, and increments the corresponding state entry.
func (k Keeper) GetNextProjectIDAndIncrement(ctx sdk.Context) uint64 {
	var projectID uint64
	store := ctx.KVStore(k.storeKey)

	bz := store.Get(types.KeyNextGlobalProjectID)
	if bz == nil {
		panic(fmt.Errorf("project has not been initialized -- Should have been done in InitGenesis"))
	} else {
		val := gogotypes.UInt64Value{}

		err := k.cdc.Unmarshal(bz, &val)
		if err != nil {
			panic(err)
		}

		projectID = val.GetValue()
	}

	k.SetNextProjectID(ctx, projectID+1)
	return projectID + 1
}

func (k Keeper) GetProjectById(ctx sdk.Context, projectId uint64) (types.Project, error) {
	store := ctx.KVStore(k.storeKey)
	projectKey := types.GetKeyPrefixProject(projectId)
	if !store.Has(projectKey) {
		fmt.Errorf("project with ID %d does not exist", projectKey)
		return types.Project{}, nil
	}
	project, err := k.UnmarshalProject(store.Get(projectKey))
	if(err != nil) {
		return types.Project{}, err
	}

	return project, nil
}

func (k Keeper) GetProjectAddress(ctx sdk.Context, projectId uint64) (sdk.AccAddress, error) {
	store := ctx.KVStore(k.storeKey)
	projectKey := types.GetKeyPrefixProject(projectId)
	if !store.Has(projectKey) {
		fmt.Errorf("project with ID %d does not exist", projectKey)
		return sdk.AccAddress{}, nil
	}
	project, err := k.UnmarshalProject(store.Get(projectKey))
	if(err != nil) {
		return sdk.AccAddress{}, err
	}
	projectAddress := k.accountKeeper.GetModuleAddress(project.ProjectAddress)
	return projectAddress, nil
}

func (k Keeper) GetAllProjects(ctx sdk.Context) (res []types.Project, err error) {
	store := ctx.KVStore(k.storeKey)
	iter := sdk.KVStorePrefixIterator(store, types.KeyPrefixProject)
	defer iter.Close()
	for ; iter.Valid(); iter.Next() {
		bz := iter.Value()

		project, err := k.UnmarshalProject(bz)
		if err != nil {
			return nil, err
		}

		//only get projects that have not been deleted
		if(project != types.Project{}) {
			res = append(res, project)
		}
	}
	return res, nil
}

// SetNextProjectID sets next project ID.
func (k Keeper) SetNextProjectID(ctx sdk.Context, projectID uint64) {
	store := ctx.KVStore(k.storeKey)
	bz := k.cdc.MustMarshal(&gogotypes.UInt64Value{Value: projectID})
	store.Set(types.KeyNextGlobalProjectID, bz)
}

// Get new project address
func (k Keeper) NewProjectAddress(projectID uint64) sdk.AccAddress {
	key := append([]byte("pool"), sdk.Uint64ToBigEndian(projectID)...)
	return address.Module(types.ModuleName, key)
}

// ============ Hooks

// Set the gamm hooks.
func (k *Keeper) SetHooks(gh types.LaunchpadHooks) *Keeper {
	if k.hooks != nil {
		panic("cannot set gamm hooks twice")
	}

	k.hooks = gh

	return k
}