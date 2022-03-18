package keeper

import (
	"github.com/notional-labs/anone/x/claims/types"
)

var _ types.QueryServer = Keeper{}
