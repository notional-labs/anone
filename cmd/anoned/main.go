package main

import (
	"os"

	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/notional-labs/anone/app"
	"github.com/tendermint/spm/cosmoscmd"
)

func main() {
	setupConfig()

	rootCmd, _ := cosmoscmd.NewRootCmd(
		app.Name,
		app.AccountAddressPrefix,
		app.DefaultNodeHome,
		app.Name,
		app.ModuleBasics,
		app.New,
		// this line is used by starport scaffolding # root/arguments
	)

	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}
}

func setupConfig() {
	// set the address prefixes
	config := sdk.GetConfig()
	SetBip44CoinType(config)
	RegisterDenoms()
}
