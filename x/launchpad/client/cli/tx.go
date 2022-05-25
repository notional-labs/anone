package cli

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/notional-labs/anone/x/launchpad/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var (
	DefaultRelativePacketTimeoutTimestamp = uint64((time.Duration(10) * time.Minute).Nanoseconds())
)

const (
	flagPacketTimeoutTimestamp = "packet-timeout-timestamp"
	listSeparator              = ","
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdCreateProject())
	cmd.AddCommand(CmdModifyProjectInformation())
	cmd.AddCommand(CmdModifyProjectStartTime())
	cmd.AddCommand(CmdDeleteProject())

	return cmd
}

func CmdCreateProject() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-project [project_title] [project_information] [start_time]",
		Short: "Create a new project",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			projectTitle := args[0]
			projectInformation := args[1]

			startTime, err := time.Parse("2022-05-21T15:04:05Z", args[2])
			if(err != nil) {
				return err
			}

			msg := types.NewMsgCreateProjectRequest(string(clientCtx.GetFromAddress()), projectTitle, projectInformation, startTime)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdModifyProjectInformation() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "modify-information [project_id] [project_information]",
		Short: "Modify information of project",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			projectId, err := sdk.ParseUint(args[0])
			if(err != nil) {
				return err
			}

			projectInformation := args[1]

			msg := types.NewMsgModifyProjectInformationRequest(string(clientCtx.GetFromAddress()), projectId.Uint64(), projectInformation)
			
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdModifyProjectStartTime() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "modify-start-time [project_id] [start_time]",
		Short: "Modify start time of project",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			projectId, err := sdk.ParseUint(args[0])
			if(err != nil) {
				return err
			}

			startTime, err := time.Parse("2022-05-21T15:04:05Z", args[1])
			if(err != nil) {
				return err
			}

			msg := types.NewMsgModifyStartTimeRequest(string(clientCtx.GetFromAddress()), projectId.Uint64(), startTime)
			
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdDeleteProject() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-project [project_id]",
		Short: "Delete project",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			projectId, err := sdk.ParseUint(args[0])
			if(err != nil) {
				return err
			}

			msg := types.NewMsgDeleteProjectRequest(string(clientCtx.GetFromAddress()), projectId.Uint64())
			
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
