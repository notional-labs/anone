package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	launchpad "github.com/notional-labs/anone/x/launchpad/types"
)

// AccountKeeper defines the expected account keeper used for simulations (noalias)
type AccountKeeper interface {
	GetAccount(ctx sdk.Context, addr sdk.AccAddress) types.AccountI
	// Methods imported from account should be defined here
}

// BankKeeper defines the expected interface needed to retrieve account balances.
type BankViewKeeper interface {
	GetAllBalances(ctx sdk.Context, addr sdk.AccAddress) sdk.Coins
	HasBalance(ctx sdk.Context, addr sdk.AccAddress, amt sdk.Coin) bool
	// Methods imported from bank should be defined here
}

type LaunchpadKeeper interface {
	GetProjectById(ctx sdk.Context, projectID uint64) (launchpad.Project, error)
}
