package launchpad

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/notional-labs/anone/x/launchpad/keeper"
	"github.com/notional-labs/anone/x/launchpad/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	k.SetParams(ctx, genState.Params)

	if genState.GlobalProjectIdStart != uint64(len(genState.Projects)) {
		panic(sdkerrors.Wrapf(
			types.ErrGenesisProjectIDDoesNotMatchProjectArray,
			"Check genesis again: attempting to init genesis with unequal project array length and GlobalProjectIdStart",
		))
	}
	k.SetNextProjectID(ctx, genState.GlobalProjectIdStart)

	// setup initial projects
	for _, any := range genState.Projects {
		if err := k.SetProject(ctx, *any); err != nil {
			panic(err)
		}
	}
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
