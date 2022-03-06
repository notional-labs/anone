package main

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/spf13/cobra"

	gravityclient "github.com/Gravity-Bridge/Gravity-Bridge/module/x/gravity/client/cli"
	gravitytypes "github.com/Gravity-Bridge/Gravity-Bridge/module/x/gravity/types"
)

func AddGenesisGravityMsgCmd(defaultNodeHome string) *cobra.Command {
	txCmd := &cobra.Command{
		Use:                        "add-gravity-genesis-message",
		Short:                      "gravity genesis subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}
	txCmd.AddCommand(
		gravityclient.GetTxCmd(gravitytypes.StoreKey),
		gravityclient.GetQueryCmd(),
	)
	return txCmd
}
