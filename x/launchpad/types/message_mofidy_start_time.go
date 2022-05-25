package types

import (
	"time"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgModifyStartTimeRequest{}

// msg types
const (
	TypeMsgModifyStartTimeRequest = "create_project"
)

func NewMsgModifyStartTimeRequest(owner string, id uint64, startTime time.Time) *MsgModifyStartTimeRequest {
	return &MsgModifyStartTimeRequest{
		Owner:  owner,
		ProjectId: id,
		StartTime:  startTime,
	}
}

func (msg *MsgModifyStartTimeRequest) Route() string {
	return RouterKey
}

func (msg *MsgModifyStartTimeRequest) Type() string {
	return TypeMsgModifyStartTimeRequest
}

func (msg *MsgModifyStartTimeRequest) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

func (msg *MsgModifyStartTimeRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgModifyStartTimeRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}
	return nil
}