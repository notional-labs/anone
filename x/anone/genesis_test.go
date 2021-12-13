package anone_test

import (
	"testing"

	keepertest "github.com/notional-labs/anone/testutil/keeper"
	"github.com/notional-labs/anone/x/anone"
	"github.com/notional-labs/anone/x/anone/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.AnoneKeeper(t)
	anone.InitGenesis(ctx, *k, genesisState)
	got := anone.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	// this line is used by starport scaffolding # genesis/test/assert
}
