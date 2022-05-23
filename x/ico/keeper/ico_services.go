package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/ico/types"
	launchpad "github.com/notional-labs/anone/x/launchpad/types"
)

func (k Keeper) validateEnableICO(ctx sdk.Context, owner sdk.AccAddress, project launchpad.Project) error {
	// check if owner is true owner of project
	project_owner, _ := sdk.AccAddressFromBech32(project.GetProjectOwner())

	if !owner.Equals(project_owner) {
		return fmt.Errorf("address %s is not owner of project with ID %d", owner.String(), project.ProjectId)
	}

	// check if project is active, return error
	if project.ProjectActive {
		return fmt.Errorf("project with ID %d is active and therefore cannot be modified", project.ProjectId)
	}

	return nil
}

func (k Keeper) EnableICO(ctx sdk.Context, owner sdk.AccAddress, msg *types.MessageEnableICORequest) error {
	// get project
	project, err := k.launchpadKeeper.GetProjectByID(ctx, msg.ProjectId)
	if err != nil {
		return err
	}

	// validate Msg
	if err := k.validateEnableICO(ctx, owner, project); err != nil {
		return err
	}

	// create ICO struct

	// validate newly created ICO struct

	// save ICO to KV stores

	// after effect

	return nil
}
