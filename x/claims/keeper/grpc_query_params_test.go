package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	simapp "github.com/notional-labs/anone/testutil/simapp"
	"github.com/notional-labs/anone/x/claims/types"
	"github.com/stretchr/testify/require"

	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

func TestParamsQuery(t *testing.T) {

	app := simapp.New(false)

	ctx := app.BaseApp.NewContext(true, tmproto.Header{})

	keeper := app.ClaimKeeper
	wctx := sdk.WrapSDKContext(ctx)
	params := types.DefaultParams()
	keeper.SetParams(ctx, params)

	response, err := keeper.Params(wctx, &types.QueryParamsRequest{})
	require.NoError(t, err)
	require.Equal(t, &types.QueryParamsResponse{Params: params}, response)
}
