package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/ico module sentinel errors
var (
	ErrSample = sdkerrors.Register(ModuleName, 1100, "sample error")

	ErrNotImplemented = sdkerrors.Register(ModuleName, 60, "function not implemented")
)
