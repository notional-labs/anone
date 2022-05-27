package types

import sdk "github.com/cosmos/cosmos-sdk/types"

type ICOHooks interface {
	// AfterProjectCreated is called after CreateProject
	EnableICO(ctx sdk.Context, owner sdk.AccAddress, projectID uint64)
	AddDistributionToken(ctx sdk.Context, projectID uint64)
	ModifyTokenListingPrice(ctx sdk.Context, projectId uint64)
	CommitParticipation(ctx sdk.Context, projectID uint64)
}

var _ ICOHooks = MultiICOHooks{}

// combine multiple launchpad hooks, all hook functions are run in array sequence.
type MultiICOHooks []ICOHooks

// Creates hooks for the Launchpad Module.
func NewMultiProjectHooks(hooks ...ICOHooks) MultiICOHooks {
	return hooks
}

func (h MultiICOHooks) EnableICO(ctx sdk.Context, owner sdk.AccAddress, projectID uint64) {
	for i := range h {
		h[i].EnableICO(ctx, owner, projectID)
	}
}

func (h MultiICOHooks) AddDistributionToken(ctx sdk.Context, projectID uint64) {
	for i := range h {
		h[i].AddDistributionToken(ctx, projectID)
	}
}

func (h MultiICOHooks) ModifyTokenListingPrice(ctx sdk.Context, projectID uint64) {
	for i := range h {
		h[i].ModifyTokenListingPrice(ctx, projectID)
	}
}

func (h MultiICOHooks) CommitParticipation(ctx sdk.Context, projectID uint64) {
	for i := range h {
		h[i].CommitParticipation(ctx, projectID)
	}
}
