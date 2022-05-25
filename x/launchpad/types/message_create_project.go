package types

import (
	"time"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateProjectRequest{}

// msg types
const (
	TypeMsgCreateProjectRequest = "create_project"
)

func NewMsgCreateProjectRequest(owner string, title string, information string, startTime time.Time) *MsgCreateProjectRequest {
	return &MsgCreateProjectRequest{
		Owner:  owner,
		ProjectTitle: title,
		ProjectInformation:  information,
		StartTime: startTime,
	}
}

func (msg *MsgCreateProjectRequest) Route() string {
	return RouterKey
}

func (msg *MsgCreateProjectRequest) Type() string {
	return TypeMsgCreateProjectRequest
}

func (msg *MsgCreateProjectRequest) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

func (msg *MsgCreateProjectRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateProjectRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}
	return nil
}