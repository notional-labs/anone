package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/claims/types"
)

func (k msgServer) ClaimFor(goCtx context.Context, msg *types.MsgClaimFor) (*types.MsgClaimForResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// check if sender address is valid
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return nil, err
	}

	// get wallet address
	address, err := sdk.AccAddressFromBech32(msg.Address)
	if err != nil {
		return nil, err
	}

	// get module params and check if airdrop is enabled
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return nil, types.ErrAirdropNotEnabled
	}

	// check if sender and sender's action is allowed
	allowed := false
	for _, authorization := range params.AllowedClaimers {
		if authorization.ContractAddress == msg.Sender && authorization.Action == msg.Action {
			allowed = true
			break
		}
	}
	if !allowed {
		return nil, types.ErrUnauthorizedClaimer
	}

	// with this address, for this action, claim a certain amount of coins
	coins, err := k.Keeper.ClaimCoinsForAction(ctx, address, msg.GetAction())
	if err != nil {
		return nil, err
	}

	// emit a message event with attr {module, sender}
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.AttributeValueCategory),
			sdk.NewAttribute(sdk.AttributeKeySender, msg.Sender),
		),
	})
	return &types.MsgClaimForResponse{
		Address:       msg.Address,
		ClaimedAmount: coins,
	}, nil
}
