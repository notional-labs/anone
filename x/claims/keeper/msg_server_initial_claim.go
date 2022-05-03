package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/claims/types"
)

func (k msgServer) InitialClaim(goCtx context.Context, msg *types.MsgInitialClaim) (*types.MsgInitialClaimResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return nil, err
	}
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return nil, types.ErrAirdropNotEnabled
	}
	coins, err := k.Keeper.ClaimCoinsForAction(ctx, sender, types.ActionInitialClaim)
	if err != nil {
		return nil, err
	}
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.AttributeValueCategory),
			sdk.NewAttribute(sdk.AttributeKeySender, msg.Sender),
		),
	})
	return &types.MsgInitialClaimResponse{
		ClaimedAmount: coins,
	}, nil
}
