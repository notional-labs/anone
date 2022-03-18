package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "github.com/notional-labs/anone/testutil/keeper"
	"github.com/notional-labs/anone/x/claims/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.ClaimsKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
