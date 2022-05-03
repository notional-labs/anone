package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	simapp "github.com/notional-labs/anone/testutil/simapp"
	"github.com/notional-labs/anone/x/claims/keeper"
	"github.com/notional-labs/anone/x/claims/types"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	app := simapp.New(t.TempDir())

	ctx := app.BaseApp.NewContext(true, tmproto.Header{})

	k := app.ClaimKeeper
	return keeper.NewMsgServerImpl(k), sdk.WrapSDKContext(ctx)
}
