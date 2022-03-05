package app

import (
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
)

const (
	// DefaultAnoneInstanceCost is initially set the same as in wasmd
	DefaultAnOneInstanceCost uint64 = 60_000
	// DefaultAnoneCompileCost set to a large number for testing
	DefaultAnOneCompileCost uint64 = 100
)

// AnoneGasRegisterConfig is defaults plus a custom compile amount
func AnoneGasRegisterConfig() wasmkeeper.WasmGasRegisterConfig {
	gasConfig := wasmkeeper.DefaultGasRegisterConfig()
	gasConfig.InstanceCost = DefaultAnOneInstanceCost
	gasConfig.CompileCost = DefaultAnOneCompileCost

	return gasConfig
}

func NewJunoWasmGasRegister() wasmkeeper.WasmGasRegister {
	return wasmkeeper.NewWasmGasRegister(AnoneGasRegisterConfig())
}
