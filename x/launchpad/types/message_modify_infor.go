package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgModifyProjectInformationRequest{}

// msg types
const (
	TypeMsgModifyProjectInformationRequest = "create_project"
)

func NewMsgModifyProjectInformationRequest(owner string, id uint64, information string) *MsgModifyProjectInformationRequest {
	return &MsgModifyProjectInformationRequest{
		Owner:  owner,
		ProjectId: id,
		ProjectInformation:  information,
	}
}

func (msg *MsgModifyProjectInformationRequest) Route() string {
	return RouterKey
}

func (msg *MsgModifyProjectInformationRequest) Type() string {
	return TypeMsgModifyProjectInformationRequest
}

func (msg *MsgModifyProjectInformationRequest) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

func (msg *MsgModifyProjectInformationRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgModifyProjectInformationRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}
	return nil
}