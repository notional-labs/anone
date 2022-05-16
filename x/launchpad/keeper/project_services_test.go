package keeper_test

import "github.com/notional-labs/anone/x/launchpad/types"

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
		{},
	}

	for _, test := range tests {
		suite.SetupTest()

		test.fn()
	}
}
