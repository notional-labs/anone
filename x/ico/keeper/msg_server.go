package keeper

import (
	"context"

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

func (server msgServer) EnableICO(ctx context.Context, msg *types.MessageEnableICORequest) (*types.MessageEnableICOResponse, error) {
	return &types.MessageEnableICOResponse{}, types.ErrNotImplemented
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
