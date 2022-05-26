package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/x/ico/types"

	"github.com/gogo/protobuf/proto"
)

func (k Keeper) MarshalICO(ico types.ICO) ([]byte, error) {
	return proto.Marshal(&ico)
}

func (k Keeper) UnmarshalICO(bz []byte) (types.ICO, error) {
	var acc types.ICO
	return acc, proto.Unmarshal(bz, &acc)
}

func (k Keeper) SetICO(ctx sdk.Context, ico types.ICO) error {
	bz, err := k.MarshalICO(ico)
	if err != nil {
		return err
	}

	store := ctx.KVStore(k.storeKey)
	projectKey := types.GetKeyPrefixProject(ico.GetProjectId())
	store.Set(projectKey, bz)

	return nil
}
