package keeper_test

import (
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/app"
	"github.com/notional-labs/anone/testutil/simapp"
	"github.com/notional-labs/anone/x/launchpad/types"
	"github.com/stretchr/testify/suite"

	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

type KeeperTestSuite struct {
	suite.Suite

	ctx sdk.Context
	app *app.App
}

func (suite *KeeperTestSuite) SetupTest() {
	// setup app
	suite.app = simapp.New(false)

	// setup ctx
	suite.ctx = suite.app.BaseApp.NewContext(false, tmproto.Header{Height: 1, ChainID: "anone-1", Time: time.Now().UTC()})

	// set params of global_project_id
	suite.app.LaunchpadKeeper.SetParams(suite.ctx, types.Params{})
	suite.app.LaunchpadKeeper.SetNextProjectID(suite.ctx, 0)
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}
