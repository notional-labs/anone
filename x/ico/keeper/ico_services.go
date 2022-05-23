package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/ico/types"
)

func validateEnableICOMsg(ctx sdk.Context, owner sdk.AccAddress, msg *types.MessageEnableICORequest) error {
	// check if project id is legit in kv store

	// check if owner is true owner of project

	// check if project is active or not

	return nil
}

func (k Keeper) EnableICO(ctx sdk.Context, owner sdk.AccAddress, msg *types.MessageEnableICORequest) error {

	// validate Msg
	if err := validateEnableICOMsg(ctx, owner, msg); err != nil {
		return err
	}

	// create ICO struct

	// validate newly created ICO struct

	// save ICO to KV stores

	// after effect

	return nil
}
