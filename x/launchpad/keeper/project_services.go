package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/launchpad/types"
)

func (k Keeper) CreateProject(ctx sdk.Context, msg *types.MsgCreateProjectRequest) (uint64, error) {
	return 0, types.ErrNotImplemented
}
