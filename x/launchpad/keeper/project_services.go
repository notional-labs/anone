package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/notional-labs/anone/x/launchpad/types"
)

func validateCreateProjectMsg(ctx sdk.Context, msg *types.MsgCreateProjectRequest) error {
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
	k.hooks.AfterProjectCreated(ctx, project_owner, projectID)

	return projectID, nil
}

func (k Keeper) ModifyProjectInformation(ctx sdk.Context, msg *types.MsgModifyProjectInformationRequest) (uint64, error) {

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

	return projectId, nil
}

func (k Keeper) ModifyStartTime(ctx sdk.Context, msg *types.MsgModifyStartTimeRequest) (uint64, error) {

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

	return projectId, nil
}
