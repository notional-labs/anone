package keeper_test

import (
	gocontext "context"
	"testing"

	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/app"
	"github.com/notional-labs/anone/x/mint/types"
)

type MintTestSuite struct {
	suite.Suite

	app         *app.App
	ctx         sdk.Context
	queryClient types.QueryClient
}

func (suite *MintTestSuite) SetupTest() {
	app := setup(false)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	queryHelper := baseapp.NewQueryServerTestHelper(ctx, app.InterfaceRegistry())
	types.RegisterQueryServer(queryHelper, app.MintKeeper)
	queryClient := types.NewQueryClient(queryHelper)

	suite.app = app
	suite.ctx = ctx

	suite.queryClient = queryClient
}

func (suite *MintTestSuite) TestGRPCParams() {
	app, ctx, queryClient := suite.app, suite.ctx, suite.queryClient

	params, err := queryClient.Params(gocontext.Background(), &types.QueryParamsRequest{})
	suite.Require().NoError(err)
	suite.Require().Equal(params.Params, app.MintKeeper.GetParams(ctx))

	annualProvisions, err := queryClient.AnnualProvisions(gocontext.Background(), &types.QueryAnnualProvisionsRequest{})
	suite.Require().NoError(err)
	suite.Require().Equal(annualProvisions.AnnualProvisions, app.MintKeeper.GetMinter(ctx).AnnualProvisions)
}

func TestMintTestSuite(t *testing.T) {
	suite.Run(t, new(MintTestSuite))
}
