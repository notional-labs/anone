package keeper_test

import (
	"testing"

	simapp "github.com/notional-labs/anone/testutil/simapp"
	"github.com/notional-labs/anone/x/claims/types"
	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

func TestGetParams(t *testing.T) {
	app := simapp.New(t.TempDir())

	ctx := app.BaseApp.NewContext(true, tmproto.Header{})

	k := app.ClaimKeeper
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
