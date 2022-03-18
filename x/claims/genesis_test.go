package claims_test

import (
	"testing"

	keepertest "github.com/notional-labs/anone/testutil/keeper"
	"github.com/notional-labs/anone/x/claims"
	"github.com/notional-labs/anone/x/claims/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ClaimsKeeper(t)
	claims.InitGenesis(ctx, *k, genesisState)
	got := claims.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	// this line is used by starport scaffolding # genesis/test/assert
}
