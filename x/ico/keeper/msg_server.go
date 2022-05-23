package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/ico/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (server msgServer) EnableICO(goCtx context.Context, msg *types.MessageEnableICORequest) (*types.MessageEnableICOResponse, error) {
	// get ctx SDK context
	ctx := sdk.UnwrapSDKContext(goCtx)

	// get project owner
	project_owner, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		return nil, err
	}

	// invoke logic EnableICO
	err = server.Keeper.EnableICO(ctx, project_owner, msg)
	if err != nil {
		return nil, err
	}

	// emit event
	ctx.EventManager().EmitEvents(sdk.Events{
		// an event to signify a project created
		sdk.NewEvent(
			types.TypeICOEnabled,
			sdk.NewAttribute(types.AttributeProjectID, strconv.FormatUint(msg.ProjectId, 10)),
		),
		// an event to signify the event comes from which module and which signer
		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.AttributeValueCategory),
			sdk.NewAttribute(sdk.AttributeKeySender, msg.Owner),
		),
	})

	// return result to gRPC server
	return &types.MessageEnableICOResponse{}, nil
}

func (server msgServer) AddDistributionToken(ctx context.Context, msg *types.MessageAddDistributionTokenRequest) (*types.MessageAddDistributionTokenResponse, error) {
	return &types.MessageAddDistributionTokenResponse{}, types.ErrNotImplemented
}

func (server msgServer) ModifyTokenListingPrice(ctx context.Context, msg *types.MessageModifyTokenListingPriceRequest) (*types.MessageModifyTokenListingPriceResponse, error) {
	return &types.MessageModifyTokenListingPriceResponse{}, types.ErrNotImplemented
}

func (server msgServer) CommitParticipation(ctx context.Context, msg *types.MessageCommitParticipationRequest) (*types.MessageCommitParticipationResponse, error) {
	return &types.MessageCommitParticipationResponse{}, types.ErrNotImplemented
}
