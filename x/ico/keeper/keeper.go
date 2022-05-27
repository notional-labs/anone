package keeper

import (
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/notional-labs/anone/x/ico/types"
)

type (
	Keeper struct {
		cdc        codec.BinaryCodec
		storeKey   sdk.StoreKey
		memKey     sdk.StoreKey
		paramstore paramtypes.Subspace
		hooks      types.ICOHooks

		launchpadKeeper types.LaunchpadKeeper
		bankViewKeeper  types.BankViewKeeper
		accKeeper       types.AccountKeeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	ps paramtypes.Subspace,
	launchpadKeeper types.LaunchpadKeeper,
	bankViewKeeper types.BankViewKeeper,
	accKeeper types.AccountKeeper,
) *Keeper {
	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:        cdc,
		storeKey:   storeKey,
		memKey:     memKey,
		paramstore: ps,

		launchpadKeeper: launchpadKeeper,
		bankViewKeeper:  bankViewKeeper,
		accKeeper:       accKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// ============ Hooks

// Set the gamm hooks.
func (k *Keeper) SetHooks(gh types.ICOHooks) *Keeper {
	if k.hooks != nil {
		panic("cannot set gamm hooks twice")
	}

	k.hooks = gh

	return k
}
