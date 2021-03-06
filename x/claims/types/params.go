package types

import (
	fmt "fmt"
	"strings"
	"time"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	yaml "gopkg.in/yaml.v2"
)

var (
	DefaultClaimDenom         = "uan1"
	DefaultDurationUntilDecay = time.Hour
	DefaultDurationOfDecay    = time.Hour * 5
	DefaultActionPercentage = map[string]uint32{
		"ActionInitialClaim":  10,
		"ActionMintNFT":       50,
		"ActionVote":          20,
		"ActionDelegateStake": 20,
	}
)

// Parameter store keys
var (
	KeyEnabled            = []byte("Enabled")
	KeyStartTime          = []byte("StartTime")
	KeyClaimDenom         = []byte("ClaimDenom")
	KeyDurationUntilDecal = []byte("DurationUntilDecay")
	KeyDurationOfDecay    = []byte("DurationOfDecay")
	KeyAllowedClaimers    = []byte("AllowedClaimers")
	KeyActionPerCentage	  = []byte("ActionPercentage")
)

func NewParams(enabled bool, claimDenom string, startTime time.Time, durationUntilDecay, durationOfDecay time.Duration, allowedClaimers []ClaimAuthorization, actionPercentage map[string]uint32) Params {
	return Params{
		AirdropEnabled:     enabled,
		ClaimDenom:         claimDenom,
		AirdropStartTime:   startTime,
		DurationUntilDecay: durationUntilDecay,
		DurationOfDecay:    durationOfDecay,
		AllowedClaimers:    allowedClaimers,
		ActionPercentage: 	actionPercentage,
	}
}

func DefaultParams() Params {
	return Params{
		AirdropEnabled:     true,
		AirdropStartTime:   time.Now(),
		DurationUntilDecay: DefaultDurationUntilDecay,
		DurationOfDecay:    DefaultDurationOfDecay,
		ClaimDenom:         DefaultClaimDenom,
		ActionPercentage:   DefaultActionPercentage,
	}
}

// String implements the stringer interface for Params
func (p Params) String() string {
	out, err := yaml.Marshal(p)
	if err != nil {
		return ""
	}
	return string(out)
}

// ParamSetPairs - Implements params.ParamSet
// Register keys to be stored in params
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyEnabled, &p.AirdropEnabled, validateEnabled),
		paramtypes.NewParamSetPair(KeyClaimDenom, &p.ClaimDenom, validateDenom),
		paramtypes.NewParamSetPair(KeyStartTime, &p.AirdropStartTime, validateTime),
		paramtypes.NewParamSetPair(KeyDurationUntilDecal, &p.DurationUntilDecay, validateDuration),
		paramtypes.NewParamSetPair(KeyDurationOfDecay, &p.DurationOfDecay, validateDuration),
		paramtypes.NewParamSetPair(KeyAllowedClaimers, &p.AllowedClaimers, validateClaimers),
		paramtypes.NewParamSetPair(KeyActionPerCentage, &p.ActionPercentage, validateActionPercentage),
	}
}

// Validate validates all params
func (p Params) Validate() error {
	if err := validateEnabled(p.AirdropEnabled); err != nil {
		return err
	}
	err := validateDenom(p.ClaimDenom)
	return err
}

func (p Params) IsAirdropEnabled(t time.Time) bool {
	if !p.AirdropEnabled {
		return false
	}
	if p.AirdropStartTime.IsZero() {
		return false
	}
	if t.Before(p.AirdropStartTime) {
		return false
	}
	return true
}

// ParamKeyTable for staking module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// ====== validating group to make sure that value is correct in NewParamSetPair() ======
func validateEnabled(i interface{}) error {
	_, ok := i.(bool)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	return nil
}

func validateDenom(i interface{}) error {
	v, ok := i.(string)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if strings.TrimSpace(v) == "" {
		return fmt.Errorf("invalid denom: %s", v)
	}

	return nil
}

func validateTime(i interface{}) error {
	_, ok := i.(time.Time)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	return nil
}

func validateDuration(i interface{}) error {
	d, ok := i.(time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	if d < 1 {
		return fmt.Errorf("duration must be greater than or equal to 1: %d", d)
	}
	return nil
}

func validateClaimers(i interface{}) error {
	_, ok := i.([]ClaimAuthorization)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	return nil
}

func validateActionPercentage(i interface{}) error {
	_, ok := i.(map[string]uint32)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	return nil
}
