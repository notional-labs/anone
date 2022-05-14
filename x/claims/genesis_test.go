package claims_test

import (
	"testing"

	simapp "github.com/notional-labs/anone/testutil/simapp"
	"github.com/notional-labs/anone/x/claims"
	"github.com/notional-labs/anone/x/claims/types"
	"github.com/stretchr/testify/require"

	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	app := simapp.New(false)

	ctx := app.BaseApp.NewContext(true, tmproto.Header{})

	k := app.ClaimKeeper
	claims.InitGenesis(ctx, k, genesisState)
	got := claims.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	// this line is used by starport scaffolding # genesis/test/assert
}
