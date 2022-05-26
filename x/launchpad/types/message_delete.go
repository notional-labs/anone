package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgDeleteProjectRequest{}

// msg types
const (
	TypeMsgDeleteProjectRequest = "create_project"
)

func NewMsgDeleteProjectRequest(owner string, id uint64) *MsgDeleteProjectRequest {
	return &MsgDeleteProjectRequest{
		Owner:  owner,
		ProjectId: id,
	}
}

func (msg *MsgDeleteProjectRequest) Route() string {
	return RouterKey
}

func (msg *MsgDeleteProjectRequest) Type() string {
	return TypeMsgDeleteProjectRequest
}

func (msg *MsgDeleteProjectRequest) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

func (msg *MsgDeleteProjectRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteProjectRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}
	return nil
}