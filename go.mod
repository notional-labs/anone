module github.com/notional-labs/anone

go 1.16

require (
	github.com/CosmWasm/wasmd v0.20.0
	github.com/cosmos/cosmos-sdk v0.45.0
	github.com/cosmos/ibc-go/v2 v2.0.2
	github.com/prometheus/client_golang v1.11.0
	github.com/spf13/cast v1.4.1
	github.com/spf13/cobra v1.2.1
	github.com/tendermint/spm v0.1.9
	github.com/tendermint/tendermint v0.34.15
	github.com/tendermint/tm-db v0.6.6
)

replace (
	github.com/CosmWasm/wasmd => github.com/cosmoscontracts/wasmd v1.0.0-juno6
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	github.com/keybase/go-keychain => github.com/99designs/go-keychain v0.0.0-20191008050251-8e49817e8af4
	google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
