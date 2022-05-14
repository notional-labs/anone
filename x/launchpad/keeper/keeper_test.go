package keeper_test

import (
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/app"
	"github.com/notional-labs/anone/testutil/simapp"
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
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}
