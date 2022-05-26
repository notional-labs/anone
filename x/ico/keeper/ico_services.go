package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/ico/types"
	launchpad "github.com/notional-labs/anone/x/launchpad/types"
)

func (k Keeper) validateEnableICO(ctx sdk.Context, owner sdk.AccAddress, project launchpad.Project, tokenForDistribution []*sdk.Coin) error {
	// check if owner is true owner of project
	project_owner, _ := sdk.AccAddressFromBech32(project.GetProjectOwner())

	if !owner.Equals(project_owner) {
		return fmt.Errorf("address %s is not owner of project with ID %d", owner.String(), project.ProjectId)
	}

	// check if project is active, return error
	if project.ProjectActive {
		return fmt.Errorf("project with ID %d is active and therefore cannot be modified", project.ProjectId)
	}

	// check if user address has enough tokens to add to ico. For now, only 1 token is supported
	for _, coin := range tokenForDistribution {
		if !k.bankViewKeeper.HasBalance(ctx, owner, *coin) {
			return types.ErrNotEnoughFunds
		}
	}

	return nil
}

func validateCreatedICO(ctx sdk.Context, ico types.ICO) error {
	return nil
}

func (k Keeper) EnableICO(ctx sdk.Context, owner sdk.AccAddress, msg *types.MessageEnableICORequest) error {
	// get project
	project, err := k.launchpadKeeper.GetProjectByID(ctx, msg.ProjectId)
	if err != nil {
		return err
	}

	// validate Msg
	if err := k.validateEnableICO(ctx, owner, project, msg.TokenForDistribution); err != nil {
		return err
	}

	// create ICO struct
	ico := types.ICO{
		ProjectId:              msg.ProjectId,
		TokenForDistribution:   []sdk.Coin{},
		TotalDistributedAmount: sdk.ZeroInt(),
		TokenListingPrice:      *msg.TokenListingPrice,
	}

	for _, coin := range msg.TokenForDistribution {
		ico.TokenForDistribution = append(ico.TokenForDistribution, *coin)
	}

	// validate newly created ICO struct
	if err := validateCreatedICO(ctx, ico); err != nil {
		return err
	}

	// save ICO to KV stores
	if err := k.SetICO(ctx, ico); err != nil {
		return err
	}

	// after effect

	return nil
}
