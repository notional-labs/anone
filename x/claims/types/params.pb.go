// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: claims/params.proto

package types

import (
	fmt "fmt"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	github_com_gogo_protobuf_types "github.com/gogo/protobuf/types"
	_ "github.com/golang/protobuf/ptypes/duration"
	_ "github.com/golang/protobuf/ptypes/timestamp"
	io "io"
	math "math"
	math_bits "math/bits"
	time "time"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf
var _ = time.Kitchen

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type ClaimAuthorization struct {
	ContractAddress string `protobuf:"bytes,1,opt,name=contract_address,json=contractAddress,proto3" json:"contract_address,omitempty" yaml:"contract_address"`
	Action          Action `protobuf:"varint,2,opt,name=action,proto3,enum=notionallabs.anone.claims.Action" json:"action,omitempty" yaml:"action"`
}

func (m *ClaimAuthorization) Reset()         { *m = ClaimAuthorization{} }
func (m *ClaimAuthorization) String() string { return proto.CompactTextString(m) }
func (*ClaimAuthorization) ProtoMessage()    {}
func (*ClaimAuthorization) Descriptor() ([]byte, []int) {
	return fileDescriptor_a4639581e44a222f, []int{0}
}
func (m *ClaimAuthorization) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *ClaimAuthorization) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_ClaimAuthorization.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *ClaimAuthorization) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ClaimAuthorization.Merge(m, src)
}
func (m *ClaimAuthorization) XXX_Size() int {
	return m.Size()
}
func (m *ClaimAuthorization) XXX_DiscardUnknown() {
	xxx_messageInfo_ClaimAuthorization.DiscardUnknown(m)
}

var xxx_messageInfo_ClaimAuthorization proto.InternalMessageInfo

func (m *ClaimAuthorization) GetContractAddress() string {
	if m != nil {
		return m.ContractAddress
	}
	return ""
}

func (m *ClaimAuthorization) GetAction() Action {
	if m != nil {
		return m.Action
	}
	return ActionInitialClaim
}

// Params defines the parameters for the module.
type Params struct {
	AirdropEnabled     bool          `protobuf:"varint,1,opt,name=airdrop_enabled,json=airdropEnabled,proto3" json:"airdrop_enabled,omitempty"`
	AirdropStartTime   time.Time     `protobuf:"bytes,2,opt,name=airdrop_start_time,json=airdropStartTime,proto3,stdtime" json:"airdrop_start_time" yaml:"airdrop_start_time"`
	DurationUntilDecay time.Duration `protobuf:"bytes,3,opt,name=duration_until_decay,json=durationUntilDecay,proto3,stdduration" json:"duration_until_decay,omitempty" yaml:"duration_until_decay"`
	DurationOfDecay    time.Duration `protobuf:"bytes,4,opt,name=duration_of_decay,json=durationOfDecay,proto3,stdduration" json:"duration_of_decay,omitempty" yaml:"duration_of_decay"`
	// denom of claimable asset
	ClaimDenom string `protobuf:"bytes,5,opt,name=claim_denom,json=claimDenom,proto3" json:"claim_denom,omitempty"`
	// list of contracts and their allowed claim actions
	AllowedClaimers  []ClaimAuthorization `protobuf:"bytes,6,rep,name=allowed_claimers,json=allowedClaimers,proto3" json:"allowed_claimers" yaml:"allowed_claimers"`
	ActionPercentage map[string]uint32    `protobuf:"bytes,7,rep,name=action_percentage,json=actionPercentage,proto3" json:"action_percentage" yaml:"action_percentage" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"varint,2,opt,name=value,proto3"`
}

func (m *Params) Reset()      { *m = Params{} }
func (*Params) ProtoMessage() {}
func (*Params) Descriptor() ([]byte, []int) {
	return fileDescriptor_a4639581e44a222f, []int{1}
}
func (m *Params) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Params) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Params.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Params) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Params.Merge(m, src)
}
func (m *Params) XXX_Size() int {
	return m.Size()
}
func (m *Params) XXX_DiscardUnknown() {
	xxx_messageInfo_Params.DiscardUnknown(m)
}

var xxx_messageInfo_Params proto.InternalMessageInfo

func (m *Params) GetAirdropEnabled() bool {
	if m != nil {
		return m.AirdropEnabled
	}
	return false
}

func (m *Params) GetAirdropStartTime() time.Time {
	if m != nil {
		return m.AirdropStartTime
	}
	return time.Time{}
}

func (m *Params) GetDurationUntilDecay() time.Duration {
	if m != nil {
		return m.DurationUntilDecay
	}
	return 0
}

func (m *Params) GetDurationOfDecay() time.Duration {
	if m != nil {
		return m.DurationOfDecay
	}
	return 0
}

func (m *Params) GetClaimDenom() string {
	if m != nil {
		return m.ClaimDenom
	}
	return ""
}

func (m *Params) GetAllowedClaimers() []ClaimAuthorization {
	if m != nil {
		return m.AllowedClaimers
	}
	return nil
}

func (m *Params) GetActionPercentage() map[string]uint32 {
	if m != nil {
		return m.ActionPercentage
	}
	return nil
}

func init() {
	proto.RegisterType((*ClaimAuthorization)(nil), "notionallabs.anone.claims.ClaimAuthorization")
	proto.RegisterType((*Params)(nil), "notionallabs.anone.claims.Params")
	proto.RegisterMapType((map[string]uint32)(nil), "notionallabs.anone.claims.Params.ActionPercentageEntry")
}

func init() { proto.RegisterFile("claims/params.proto", fileDescriptor_a4639581e44a222f) }

var fileDescriptor_a4639581e44a222f = []byte{
	// 638 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x84, 0x54, 0x3d, 0x6f, 0xd3, 0x50,
	0x14, 0xcd, 0xeb, 0x47, 0x80, 0x57, 0xb5, 0x49, 0x1f, 0x45, 0x38, 0xa9, 0x64, 0x07, 0x4b, 0x88,
	0x0e, 0xd4, 0x96, 0xda, 0x01, 0xd4, 0xad, 0x4e, 0x0b, 0x42, 0x42, 0xa2, 0x32, 0xb0, 0xb0, 0x58,
	0x2f, 0xf6, 0x6b, 0x6a, 0x61, 0xfb, 0x59, 0xcf, 0x2f, 0x80, 0xf9, 0x01, 0x0c, 0x48, 0x48, 0x9d,
	0x50, 0x47, 0x66, 0x7e, 0x49, 0x17, 0xa4, 0x8e, 0x4c, 0x06, 0xb5, 0x1b, 0x63, 0x7e, 0x01, 0x7a,
	0x1f, 0x2e, 0x25, 0x29, 0x65, 0x8a, 0x7d, 0xee, 0xb9, 0xe7, 0x9e, 0x7b, 0x73, 0x12, 0x78, 0x33,
	0x4c, 0x70, 0x9c, 0x16, 0x6e, 0x8e, 0x19, 0x4e, 0x0b, 0x27, 0x67, 0x94, 0x53, 0xd4, 0xc9, 0x28,
	0x8f, 0x69, 0x86, 0x93, 0x04, 0x0f, 0x0a, 0x07, 0x67, 0x34, 0x23, 0x8e, 0xe2, 0x75, 0x57, 0x86,
	0x74, 0x48, 0x25, 0xcb, 0x15, 0x4f, 0xaa, 0xa1, 0x6b, 0x0e, 0x29, 0x1d, 0x26, 0xc4, 0x95, 0x6f,
	0x83, 0xd1, 0xbe, 0x1b, 0x8d, 0x18, 0x16, 0x12, 0xba, 0x6e, 0x4d, 0xd6, 0x79, 0x9c, 0x92, 0x82,
	0xe3, 0x34, 0xd7, 0x84, 0x8e, 0xb6, 0x21, 0x3f, 0x02, 0x46, 0x42, 0xca, 0x22, 0x55, 0xb2, 0xbf,
	0x02, 0x88, 0xfa, 0x02, 0xde, 0x1e, 0xf1, 0x03, 0xca, 0xe2, 0xf7, 0x52, 0x18, 0x3d, 0x82, 0xed,
	0x90, 0x66, 0x9c, 0xe1, 0x90, 0x07, 0x38, 0x8a, 0x18, 0x29, 0x0a, 0x03, 0xf4, 0xc0, 0xda, 0x0d,
	0x6f, 0x75, 0x5c, 0x59, 0xb7, 0x4b, 0x9c, 0x26, 0x5b, 0xf6, 0x24, 0xc3, 0xf6, 0x5b, 0x35, 0xb4,
	0xad, 0x10, 0xf4, 0x14, 0x36, 0x71, 0x28, 0x14, 0x8d, 0x99, 0x1e, 0x58, 0x5b, 0xda, 0xb8, 0xe3,
	0xfc, 0x73, 0x79, 0x67, 0x5b, 0x12, 0xbd, 0xe5, 0x71, 0x65, 0x2d, 0xaa, 0x01, 0xaa, 0xd5, 0xf6,
	0xb5, 0x86, 0xfd, 0xad, 0x09, 0x9b, 0x7b, 0xf2, 0x94, 0xe8, 0x1e, 0x6c, 0xe1, 0x98, 0x45, 0x8c,
	0xe6, 0x01, 0xc9, 0xf0, 0x20, 0x21, 0x91, 0xf4, 0x77, 0xdd, 0x5f, 0xd2, 0xf0, 0xae, 0x42, 0x11,
	0x85, 0xa8, 0x26, 0x16, 0x1c, 0x33, 0x1e, 0x88, 0xe3, 0x48, 0x37, 0x0b, 0x1b, 0x5d, 0x47, 0x5d,
	0xce, 0xa9, 0x2f, 0xe7, 0xbc, 0xa8, 0x2f, 0xe7, 0xdd, 0x3d, 0xae, 0xac, 0xc6, 0xb8, 0xb2, 0x3a,
	0xda, 0xca, 0x94, 0x86, 0x7d, 0xf8, 0xc3, 0x02, 0x7e, 0x5b, 0x17, 0x9e, 0x0b, 0x5c, 0x74, 0xa3,
	0xcf, 0x00, 0xae, 0xd4, 0x5f, 0x50, 0x30, 0xca, 0x78, 0x9c, 0x04, 0x11, 0x09, 0x71, 0x69, 0xcc,
	0xca, 0x99, 0x9d, 0xa9, 0x99, 0x3b, 0x9a, 0xec, 0x3d, 0x11, 0x23, 0x7f, 0x55, 0x96, 0x79, 0x59,
	0xfb, 0x7d, 0x9a, 0xc6, 0x9c, 0xa4, 0x39, 0x2f, 0xc7, 0x95, 0xb5, 0xaa, 0x4c, 0x5d, 0xc6, 0xb3,
	0x8f, 0x84, 0x2d, 0x54, 0x97, 0x5e, 0x8a, 0xca, 0x8e, 0x28, 0xa0, 0x8f, 0x00, 0x2e, 0x9f, 0x77,
	0xd0, 0x7d, 0xed, 0x6a, 0xee, 0x7f, 0xae, 0xfa, 0xda, 0xd5, 0xea, 0x54, 0xef, 0x5f, 0x96, 0x8c,
	0x09, 0x4b, 0x35, 0x49, 0xf9, 0x69, 0xd5, 0xf8, 0xb3, 0x7d, 0x65, 0xc6, 0x82, 0x0b, 0x2a, 0x8d,
	0x11, 0xc9, 0x68, 0x6a, 0xcc, 0x8b, 0x6c, 0xf9, 0x50, 0x42, 0x3b, 0x02, 0x41, 0x9f, 0x00, 0x6c,
	0xe3, 0x24, 0xa1, 0x6f, 0x49, 0x14, 0x48, 0x98, 0xb0, 0xc2, 0x68, 0xf6, 0x66, 0xd7, 0x16, 0x36,
	0xd6, 0xaf, 0x08, 0xd1, 0x74, 0x96, 0xbd, 0x4d, 0xbd, 0xc0, 0x94, 0xdc, 0x9f, 0x24, 0x4f, 0x56,
	0x6c, 0xbf, 0xa5, 0xa1, 0xbe, 0x46, 0xd0, 0x07, 0x00, 0x97, 0x55, 0x0c, 0x83, 0x9c, 0xb0, 0x90,
	0x64, 0x1c, 0x0f, 0x89, 0x71, 0x4d, 0x1a, 0x7a, 0x70, 0x85, 0x21, 0x95, 0x57, 0x1d, 0xee, 0xbd,
	0xf3, 0xce, 0xdd, 0x8c, 0xb3, 0xd2, 0xeb, 0xe9, 0x90, 0x19, 0x17, 0xf3, 0x7e, 0x41, 0xdf, 0xf6,
	0xdb, 0x78, 0xa2, 0xb1, 0xdb, 0x87, 0xb7, 0x2e, 0x15, 0x43, 0x6d, 0x38, 0xfb, 0x9a, 0x94, 0xea,
	0x67, 0xea, 0x8b, 0x47, 0xb4, 0x02, 0xe7, 0xdf, 0xe0, 0x64, 0xa4, 0xe2, 0xbe, 0xe8, 0xab, 0x97,
	0xad, 0x99, 0x87, 0x60, 0x6b, 0xee, 0xe8, 0x8b, 0xd5, 0xf0, 0x1e, 0x1f, 0x9f, 0x9a, 0xe0, 0xe4,
	0xd4, 0x04, 0x3f, 0x4f, 0x4d, 0x70, 0x78, 0x66, 0x36, 0x4e, 0xce, 0xcc, 0xc6, 0xf7, 0x33, 0xb3,
	0xf1, 0x6a, 0x7d, 0x18, 0xf3, 0x83, 0xd1, 0xc0, 0x09, 0x69, 0xea, 0xd6, 0xbb, 0xad, 0x8b, 0xe5,
	0x5c, 0xb9, 0x9c, 0xfb, 0xce, 0xd5, 0x7f, 0x29, 0xbc, 0xcc, 0x49, 0x31, 0x68, 0xca, 0xd8, 0x6c,
	0xfe, 0x0e, 0x00, 0x00, 0xff, 0xff, 0xd7, 0x2f, 0x82, 0x57, 0xf0, 0x04, 0x00, 0x00,
}

func (m *ClaimAuthorization) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *ClaimAuthorization) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *ClaimAuthorization) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Action != 0 {
		i = encodeVarintParams(dAtA, i, uint64(m.Action))
		i--
		dAtA[i] = 0x10
	}
	if len(m.ContractAddress) > 0 {
		i -= len(m.ContractAddress)
		copy(dAtA[i:], m.ContractAddress)
		i = encodeVarintParams(dAtA, i, uint64(len(m.ContractAddress)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *Params) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Params) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Params) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.ActionPercentage) > 0 {
		for k := range m.ActionPercentage {
			v := m.ActionPercentage[k]
			baseI := i
			i = encodeVarintParams(dAtA, i, uint64(v))
			i--
			dAtA[i] = 0x10
			i -= len(k)
			copy(dAtA[i:], k)
			i = encodeVarintParams(dAtA, i, uint64(len(k)))
			i--
			dAtA[i] = 0xa
			i = encodeVarintParams(dAtA, i, uint64(baseI-i))
			i--
			dAtA[i] = 0x3a
		}
	}
	if len(m.AllowedClaimers) > 0 {
		for iNdEx := len(m.AllowedClaimers) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.AllowedClaimers[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintParams(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x32
		}
	}
	if len(m.ClaimDenom) > 0 {
		i -= len(m.ClaimDenom)
		copy(dAtA[i:], m.ClaimDenom)
		i = encodeVarintParams(dAtA, i, uint64(len(m.ClaimDenom)))
		i--
		dAtA[i] = 0x2a
	}
	n1, err1 := github_com_gogo_protobuf_types.StdDurationMarshalTo(m.DurationOfDecay, dAtA[i-github_com_gogo_protobuf_types.SizeOfStdDuration(m.DurationOfDecay):])
	if err1 != nil {
		return 0, err1
	}
	i -= n1
	i = encodeVarintParams(dAtA, i, uint64(n1))
	i--
	dAtA[i] = 0x22
	n2, err2 := github_com_gogo_protobuf_types.StdDurationMarshalTo(m.DurationUntilDecay, dAtA[i-github_com_gogo_protobuf_types.SizeOfStdDuration(m.DurationUntilDecay):])
	if err2 != nil {
		return 0, err2
	}
	i -= n2
	i = encodeVarintParams(dAtA, i, uint64(n2))
	i--
	dAtA[i] = 0x1a
	n3, err3 := github_com_gogo_protobuf_types.StdTimeMarshalTo(m.AirdropStartTime, dAtA[i-github_com_gogo_protobuf_types.SizeOfStdTime(m.AirdropStartTime):])
	if err3 != nil {
		return 0, err3
	}
	i -= n3
	i = encodeVarintParams(dAtA, i, uint64(n3))
	i--
	dAtA[i] = 0x12
	if m.AirdropEnabled {
		i--
		if m.AirdropEnabled {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintParams(dAtA []byte, offset int, v uint64) int {
	offset -= sovParams(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *ClaimAuthorization) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.ContractAddress)
	if l > 0 {
		n += 1 + l + sovParams(uint64(l))
	}
	if m.Action != 0 {
		n += 1 + sovParams(uint64(m.Action))
	}
	return n
}

func (m *Params) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.AirdropEnabled {
		n += 2
	}
	l = github_com_gogo_protobuf_types.SizeOfStdTime(m.AirdropStartTime)
	n += 1 + l + sovParams(uint64(l))
	l = github_com_gogo_protobuf_types.SizeOfStdDuration(m.DurationUntilDecay)
	n += 1 + l + sovParams(uint64(l))
	l = github_com_gogo_protobuf_types.SizeOfStdDuration(m.DurationOfDecay)
	n += 1 + l + sovParams(uint64(l))
	l = len(m.ClaimDenom)
	if l > 0 {
		n += 1 + l + sovParams(uint64(l))
	}
	if len(m.AllowedClaimers) > 0 {
		for _, e := range m.AllowedClaimers {
			l = e.Size()
			n += 1 + l + sovParams(uint64(l))
		}
	}
	if len(m.ActionPercentage) > 0 {
		for k, v := range m.ActionPercentage {
			_ = k
			_ = v
			mapEntrySize := 1 + len(k) + sovParams(uint64(len(k))) + 1 + sovParams(uint64(v))
			n += mapEntrySize + 1 + sovParams(uint64(mapEntrySize))
		}
	}
	return n
}

func sovParams(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozParams(x uint64) (n int) {
	return sovParams(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *ClaimAuthorization) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowParams
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: ClaimAuthorization: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: ClaimAuthorization: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ContractAddress", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthParams
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthParams
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ContractAddress = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Action", wireType)
			}
			m.Action = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Action |= Action(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipParams(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthParams
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *Params) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowParams
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: Params: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Params: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field AirdropEnabled", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.AirdropEnabled = bool(v != 0)
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field AirdropStartTime", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthParams
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthParams
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_gogo_protobuf_types.StdTimeUnmarshal(&m.AirdropStartTime, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DurationUntilDecay", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthParams
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthParams
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_gogo_protobuf_types.StdDurationUnmarshal(&m.DurationUntilDecay, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DurationOfDecay", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthParams
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthParams
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_gogo_protobuf_types.StdDurationUnmarshal(&m.DurationOfDecay, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ClaimDenom", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthParams
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthParams
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ClaimDenom = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field AllowedClaimers", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthParams
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthParams
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.AllowedClaimers = append(m.AllowedClaimers, ClaimAuthorization{})
			if err := m.AllowedClaimers[len(m.AllowedClaimers)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ActionPercentage", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowParams
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthParams
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthParams
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.ActionPercentage == nil {
				m.ActionPercentage = make(map[string]uint32)
			}
			var mapkey string
			var mapvalue uint32
			for iNdEx < postIndex {
				entryPreIndex := iNdEx
				var wire uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowParams
					}
					if iNdEx >= l {
						return io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					wire |= uint64(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				fieldNum := int32(wire >> 3)
				if fieldNum == 1 {
					var stringLenmapkey uint64
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowParams
						}
						if iNdEx >= l {
							return io.ErrUnexpectedEOF
						}
						b := dAtA[iNdEx]
						iNdEx++
						stringLenmapkey |= uint64(b&0x7F) << shift
						if b < 0x80 {
							break
						}
					}
					intStringLenmapkey := int(stringLenmapkey)
					if intStringLenmapkey < 0 {
						return ErrInvalidLengthParams
					}
					postStringIndexmapkey := iNdEx + intStringLenmapkey
					if postStringIndexmapkey < 0 {
						return ErrInvalidLengthParams
					}
					if postStringIndexmapkey > l {
						return io.ErrUnexpectedEOF
					}
					mapkey = string(dAtA[iNdEx:postStringIndexmapkey])
					iNdEx = postStringIndexmapkey
				} else if fieldNum == 2 {
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowParams
						}
						if iNdEx >= l {
							return io.ErrUnexpectedEOF
						}
						b := dAtA[iNdEx]
						iNdEx++
						mapvalue |= uint32(b&0x7F) << shift
						if b < 0x80 {
							break
						}
					}
				} else {
					iNdEx = entryPreIndex
					skippy, err := skipParams(dAtA[iNdEx:])
					if err != nil {
						return err
					}
					if (skippy < 0) || (iNdEx+skippy) < 0 {
						return ErrInvalidLengthParams
					}
					if (iNdEx + skippy) > postIndex {
						return io.ErrUnexpectedEOF
					}
					iNdEx += skippy
				}
			}
			m.ActionPercentage[mapkey] = mapvalue
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipParams(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthParams
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipParams(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowParams
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowParams
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowParams
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthParams
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupParams
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthParams
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthParams        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowParams          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupParams = fmt.Errorf("proto: unexpected end of group")
)
