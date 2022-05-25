package keeper

import (
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/notional-labs/anone/x/launchpad/types"
)

func validateCreateProjectMsg(ctx sdk.Context, msg *types.MsgCreateProjectRequest) error {
	if(msg == &types.MsgCreateProjectRequest{}) {
		return fmt.Errorf("Invalid msg: Empty object")
	}
	return nil
}

func validateModifyInformationMsg(ctx sdk.Context, msg *types.MsgModifyProjectInformationRequest) error {
	if(msg == &types.MsgModifyProjectInformationRequest{}) {
		return fmt.Errorf("Invalid msg: Empty object")
	}
	return nil
}

func validateModifyStartTimeMsg(ctx sdk.Context, msg *types.MsgModifyStartTimeRequest) error {
	if(msg == &types.MsgModifyStartTimeRequest{}) {
		return fmt.Errorf("Invalid msg: Empty object")
	}
	return nil
}

// start time should after current time
func validateStartTime(ctx sdk.Context, startTime time.Time) error {
	currentTime := time.Now()
	if(startTime.Before(currentTime)) {
		return fmt.Errorf("invalid start time")
	}
	return nil
}

func validateCreatedProject(ctx sdk.Context, project types.Project) error {
	// validate projectID not equal 0
	if project.GetProjectId() == 0 {
		return sdkerrors.Wrapf(
			types.ErrInvalidProject,
			"Project was attempted to be created with projectID = 0. ProjectID means wrong",
		)
	}

	return nil
}

func (k Keeper) CreateProject(ctx sdk.Context, project_owner sdk.AccAddress, msg *types.MsgCreateProjectRequest) (uint64, error) {
	// validate Msg
	if err := validateCreateProjectMsg(ctx, msg); err != nil {
		return 0, err
	}

	// validate start time
	if err := validateStartTime(ctx, msg.StartTime); err != nil {
		return 0, err
	}

	// get project id
	projectID := k.GetNextProjectIDAndIncrement(ctx)

	// get project address
	project_address := k.NewProjectAddress(projectID)

	// create project
	project := types.Project{
		ProjectOwner:       msg.GetOwner(),
		ProjectTitle:       msg.GetProjectTitle(),
		ProjectId:          projectID,
		ProjectAddress:     project_address.String(),
		ProjectInformation: msg.GetProjectInformation(),
		ProjectActive:      false,
		StartTime:          msg.GetStartTime(),
	}

	// validate created project
	if err := validateCreatedProject(ctx, project); err != nil {
		return 0, err
	}

	// save project module address to the account keeper
	acc := k.accountKeeper.NewAccount(
		ctx,
		authtypes.NewModuleAccount(
			authtypes.NewBaseAccountWithAddress(project_address),
			project.GetProjectAddress(),
		),
	)
	k.accountKeeper.SetAccount(ctx, acc)

	// save project to KV stores
	if err := k.SetProject(ctx, project); err != nil {
		return 0, err
	}

	// after effect
	// k.hooks.AfterProjectCreated(ctx, project_owner, projectID)

	return projectID, nil
}

func (k Keeper) ModifyProjectInformation(ctx sdk.Context, msg *types.MsgModifyProjectInformationRequest) (uint64, error) {
	// validate Msg
	if err := validateModifyInformationMsg(ctx, msg); err != nil {
		return 0, err
	}

	// get project id
	projectId := msg.GetProjectId()
	
	// get project by id
	project, err := k.GetProjectById(ctx, projectId)
	if(err != nil) {
		return 0, err
	}

	// check if current time before start time
	if err := validateStartTime(ctx, project.StartTime); err != nil {
		return 0, err
	}

	// check if msg.Owner is current project owner
	if(project.GetProjectOwner() != msg.GetOwner()) {
		return 0, types.ErrNotProjecOwner
	}

	// Modify project
	newProject := types.Project{
		ProjectOwner:       msg.GetOwner(),
		ProjectTitle:       project.GetProjectTitle(),
		ProjectId:          projectId,
		ProjectAddress:     project.GetProjectAddress(),
		ProjectInformation: msg.GetProjectInformation(),
		ProjectActive:      project.GetProjectActive(),
		StartTime:          project.GetStartTime(),
	}

	// save project to KV stores
	if err := k.SetProject(ctx, newProject); err != nil {
		return 0, err
	}

	// after effect
	// k.hooks.AfterProjectModified(ctx, projectId)

	return projectId, nil
}

func (k Keeper) ModifyStartTime(ctx sdk.Context, msg *types.MsgModifyStartTimeRequest) (uint64, error) {

	// validate Msg
	if err := validateModifyStartTimeMsg(ctx, msg); err != nil {
		return 0, err
	}
	// get project id
	projectId := msg.GetProjectId()
	
	// get project by id
	project, err := k.GetProjectById(ctx, projectId)
	if(err != nil) {
		return 0, err
	}

	// check if msg.Owner is current project owner
	if(project.GetProjectOwner() != msg.GetOwner()) {
		return 0, types.ErrNotProjecOwner
	}

	// check if current time before start time
	if err := validateStartTime(ctx, project.StartTime); err != nil {
		return 0, err
	}

	// validate start time
	if err := validateStartTime(ctx, msg.StartTime); err != nil {
		return 0, err
	}

	// Modify project
	newProject := types.Project{
		ProjectOwner:       msg.GetOwner(),
		ProjectTitle:       project.GetProjectTitle(),
		ProjectId:          projectId,
		ProjectAddress:     project.GetProjectAddress(),
		ProjectInformation: project.GetProjectInformation(),
		ProjectActive:      project.GetProjectActive(),
		StartTime:          msg.GetStartTime(),
	}

	// save project to KV stores
	if err := k.SetProject(ctx, newProject); err != nil {
		return 0, err
	}

	// after effect
	// k.hooks.AfterProjectModified(ctx, projectId)

	return projectId, nil
}

func (k Keeper) DeleteProject(ctx sdk.Context, msg *types.MsgDeleteProjectRequest) (uint64, error) {

	// get project id
	projectId := msg.GetProjectId()
	
	// get project by id
	project, err := k.GetProjectById(ctx, projectId)
	if(err != nil) {
		return 0, err
	}

	// check if current time before start time
	if err := validateStartTime(ctx, project.StartTime); err != nil {
		return 0, err
	}

	// check if msg.Owner is current project owner
	if(project.GetProjectOwner() != msg.GetOwner()) {
		return 0, types.ErrNotProjecOwner
	}

	// check if the project has been deleted
	if(project == types.Project{}) {
		return 0, fmt.Errorf("Project has been deleted")
	}

	projectModuleAddress := k.accountKeeper.GetModuleAddress(project.ProjectAddress)

	// check if the project contains any amount of coins
	balances := k.bankKeeper.GetAllBalances(ctx, projectModuleAddress)
	if(balances != nil) {
		return 0, fmt.Errorf("Can't delete project with coins inside")
	}

	// Modify project as empty object
	newProject := types.Project{}

	// delete project module address from the account keeper
	account := k.accountKeeper.GetAccount(ctx, projectModuleAddress)
	k.accountKeeper.RemoveAccount(ctx, account)

	// save project to KV stores
	if err := k.SetProject(ctx, newProject); err != nil {
		return 0, err
	}

	// after effect
	// k.hooks.AfterProjectDeteted(ctx, projectId)

	return projectId, nil
}
