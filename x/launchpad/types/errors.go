package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/launchpad module sentinel errors
var (
	ErrSample = sdkerrors.Register(ModuleName, 1100, "sample error")

	ErrInvalidProject = sdkerrors.Register(ModuleName, 1, "attempting to create an invalid project")

	ErrNotImplemented = sdkerrors.Register(ModuleName, 60, "function not implemented")

	ErrProjectNotFound = sdkerrors.Register(ModuleName, 404, "project not found")

	ErrNotProjecOwner = sdkerrors.Register(ModuleName, 403, "not project owner")
)
