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
		// check start time if it is before current time. If true --> error
		{},
		// check if project can contain token and return correctly the amount
		{},
	}

	for _, test := range tests {
		suite.SetupTest()

		test.fn()
	}
}

func (suite *KeeperTestSuite) TestModifyStartTime() {
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
