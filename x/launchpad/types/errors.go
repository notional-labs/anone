package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/launchpad module sentinel errors
var (
	ErrSample = sdkerrors.Register(ModuleName, 1100, "sample error")

	ErrInvalidProject                           = sdkerrors.Register(ModuleName, 1, "attempting to create an invalid project")
	ErrGenesisProjectIDDoesNotMatchProjectArray = sdkerrors.Register(ModuleName, 2, "attempting to init genesis with unequal project array length and GlobalProjectIdStart")

	ErrNotImplemented = sdkerrors.Register(ModuleName, 60, "function not implemented")

	ErrProjectNotFound = sdkerrors.Register(ModuleName, 404, "project not found")

	ErrNotProjecOwner = sdkerrors.Register(ModuleName, 403, "not project owner")
)
