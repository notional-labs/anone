package keeper_test

import (
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/launchpad/types"
) 

var (
	defaultAcctFunds  sdk.Coins = sdk.NewCoins(
		sdk.NewCoin("uan1", sdk.NewInt(1000000)),
	)
)

func (suite *KeeperTestSuite) TestCreateProject() {

	// try out calling CreateProject() to see if any error
	func() {
		keeper := suite.App.LaunchpadKeeper

		// try to create project
		// tomorrow, this project is supposed to be inactive
		msg := types.MsgCreateProjectRequest{
			Owner:              suite.TestAccs[0].String(),
			ProjectTitle:       "Project Title",
			ProjectInformation: "Project Information",
			StartTime:          suite.Ctx.BlockTime().AddDate(0, 0, 1),
		}

		_, err := keeper.CreateProject(suite.Ctx, suite.TestAccs[0], &msg)
		suite.Require().Error(err)
	}()

	tests := []struct {
		fn func()
	}{
		// ideal case
		{fn: func() {
			keeper := suite.App.LaunchpadKeeper
			msg := types.MsgCreateProjectRequest{
				Owner:              suite.TestAccs[0].String(),
				ProjectTitle:       "Project Title",
				ProjectInformation: "Project Information",
				StartTime:          suite.Ctx.BlockTime().AddDate(0, 0, 1),
			}

			projectId, err := keeper.CreateProject(suite.Ctx, suite.TestAccs[0], &msg)
			suite.Require().Error(err)

			project, err := keeper.GetProjectById(suite.Ctx, projectId)
			suite.Require().NoError(err)
			suite.Require().NotEqual(project, types.Project{})

			// check project address
			projectAddress, err := keeper.GetProjectAddress(suite.Ctx, projectId)
			suite.Require().NoError(err)
			suite.Require().NotEqual(projectAddress, sdk.AccAddress{})

			// check if project can contain token and return correctly the amount
			suite.FundAcc(projectAddress, defaultAcctFunds)
			projectBalance := suite.App.BankKeeper.GetAllBalances(suite.Ctx, projectAddress)
			suite.Require().Equal(projectBalance, defaultAcctFunds)
		}},
		// check create project with empty msg
		{fn: func() {
			keeper := suite.App.LaunchpadKeeper
			msg := types.MsgCreateProjectRequest{}

			_, err := keeper.CreateProject(suite.Ctx, suite.TestAccs[0], &msg)
			suite.Require().Error(err, "Invalid msg: Empty object")
		}},
		// check start time if it is before current time. If true --> error
		{fn: func() {
			keeper := suite.App.LaunchpadKeeper
			msg := types.MsgCreateProjectRequest{
				Owner:              suite.TestAccs[0].String(),
				ProjectTitle:       "Project Title",
				ProjectInformation: "Project Information",
				StartTime:          suite.Ctx.BlockTime().AddDate(0, 0, -1),
			}

			_, err := keeper.CreateProject(suite.Ctx, suite.TestAccs[0], &msg)
			suite.Require().Error(err, "invalid start time")
		}},
	}

	for _, test := range tests {
		suite.SetupTest()
		// Mint some assets to the accounts.
		for _, acc := range suite.TestAccs {
			suite.FundAcc(acc, defaultAcctFunds)
		}
		test.fn()
	}
}

func (suite *KeeperTestSuite) TestModifyStartTime() {
	tests := []struct {
		fn func(projectId uint64, startTime time.Time)
	}{
		// ideal case
		{
			fn: func(projectId uint64, startTime time.Time) {
				keeper := suite.App.LaunchpadKeeper
				msg := types.MsgModifyStartTimeRequest{
					Owner:              suite.TestAccs[0].String(),
					ProjectId:       	projectId,
					StartTime:          startTime.AddDate(0, 0, 1),
				}
				id, err := keeper.ModifyStartTime(suite.Ctx, &msg)
				suite.Require().NoError(err)
				suite.Require().Equal(id, projectId)

				project, err := keeper.GetProjectById(suite.Ctx, projectId)
				suite.Require().NoError(err)
				suite.Require().Equal(project.StartTime, startTime.AddDate(0, 0, 1))
			},
		},
		// Only project owner can modify
		{
			fn: func(projectId uint64, startTime time.Time) {
				keeper := suite.App.LaunchpadKeeper
				msg := types.MsgModifyStartTimeRequest{
					Owner:              suite.TestAccs[1].String(),
					ProjectId:       	projectId,
					StartTime:          startTime.AddDate(0, 0, 1),
				}
				_, err := keeper.ModifyStartTime(suite.Ctx, &msg)
				suite.Require().Error(err)
			},
		},
		// check if ID is still valid (if not existed before)
		{
			fn: func(projectId uint64, startTime time.Time) {
				keeper := suite.App.LaunchpadKeeper
				msg := types.MsgModifyStartTimeRequest{
					Owner:              suite.TestAccs[0].String(),
					ProjectId:       	uint64(projectId + 1),
					StartTime:          startTime.AddDate(0, 0, 1),
				}
				_, err := keeper.ModifyStartTime(suite.Ctx, &msg)
				suite.Require().Error(err)
			},
		},
		// check if ID is still valid (if has been deleted)
		{
			fn: func(projectId uint64, startTime time.Time) {
				keeper := suite.App.LaunchpadKeeper
				keeper.DeleteProject(suite.Ctx, &types.MsgDeleteProjectRequest{
					Owner: suite.TestAccs[0].String(),
					ProjectId: projectId,
				})
				msg := types.MsgModifyStartTimeRequest{
					Owner:              suite.TestAccs[0].String(),
					ProjectId:       	projectId,
					StartTime:          startTime.AddDate(0, 0, 1),
				}
				_, err := keeper.ModifyStartTime(suite.Ctx, &msg)
				suite.Require().Error(err)
			},
		},
		// check if modfication is before StartTime
		{},
	}

	for _, test := range tests {
		suite.SetupTest()
		// Mint some assets to the accounts.
		for _, acc := range suite.TestAccs {
			suite.FundAcc(acc, defaultAcctFunds)
		}
		defaultStartTime := suite.Ctx.BlockTime()
		projectId, err := suite.App.LaunchpadKeeper.CreateProject(suite.Ctx, suite.TestAccs[0], &types.MsgCreateProjectRequest{
			Owner:              suite.TestAccs[0].String(),
			ProjectTitle:       "Project Title",
			ProjectInformation: "Project Information",
			StartTime:          defaultStartTime,
		})
		suite.Require().NoError(err)

		test.fn(projectId, defaultStartTime)
	}
}

func (suite *KeeperTestSuite) TestModifyProjectInformation() {
	tests := []struct {
		fn func()
	}{
		// check owner
		{},
		// check if ID is still valid (if not existed before)
		{},
		// check if ID is still valid (if has been deleted)
		{},
		// check if modfication is before StartTime
		{},
	}

	for _, test := range tests {
		suite.SetupTest()

		test.fn()
	}
}

func (suite *KeeperTestSuite) TestDeleteProject() {
	tests := []struct {
		fn func()
	}{
		// check owner
		{},
		// check if ID is still valid (if not existed before)
		{},
		// check if ID is still valid (if has been deleted)
		{},
		// check if delete is before StartTime
		{},
		// check if project already has token, if not, then cannot delete
		{},
		// check if project address is still in AccountKeeper
		{},
	}

	for _, test := range tests {
		suite.SetupTest()

		test.fn()
	}
}
