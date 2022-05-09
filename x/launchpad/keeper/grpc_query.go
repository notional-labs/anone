package keeper

import (
	"github.com/notional-labs/anone/x/launchpad/types"
)

var _ types.QueryServer = Keeper{}
