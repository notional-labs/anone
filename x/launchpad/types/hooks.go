package types

import sdk "github.com/cosmos/cosmos-sdk/types"

type LaunchpadHooks interface {
	// AfterProjectCreated is called after CreateProject
	AfterProjectCreated(ctx sdk.Context, owner sdk.AccAddress, projectID uint64)
}

var _ LaunchpadHooks = MultiLaunchpadHooks{}

// combine multiple launchpad hooks, all hook functions are run in array sequence.
type MultiLaunchpadHooks []LaunchpadHooks

// Creates hooks for the Launchpad Module.
func NewMultiProjectHooks(hooks ...LaunchpadHooks) MultiLaunchpadHooks {
	return hooks
}

func (h MultiLaunchpadHooks) AfterProjectCreated(ctx sdk.Context, owner sdk.AccAddress, projectID uint64) {
	for i := range h {
		h[i].AfterProjectCreated(ctx, owner, projectID)
	}
}
