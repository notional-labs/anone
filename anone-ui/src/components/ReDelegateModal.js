import { InputNumber, message, notification, Checkbox } from "antd"
import { unbonding } from "../helpers/transaction"
import { useEffect, useState } from 'react'
import { Form } from "react-bootstrap";
import { getKeplr, getStargateClient } from "../helpers/getKeplr";
import { makeSignDocBeginRedelegateMsg, makeBeginRedelegateMsg } from "../helpers/ethereum/lib/eth-transaction/Msg"
import { broadcastTransaction } from "../helpers/ethereum/lib/eth-broadcast/broadcastTX"
import { getWeb3Instance } from "../helpers/ethereum/lib/metamaskHelpers"
import { defaultRegistryTypes, StargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing"
import ClipLoader from "react-spinners/ClipLoader"


//TODO: add logic to web, and right variale

const style = {
    transfer: {
        marginBottom: '2rem',
        width: '100%',
    },
    transferInfo: {
        padding: '50px',
        borderRadius: '10px',
        width: '20rem'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        marginTop: '2rem',
        marginBottom: '1rem'
    },
    formInput: {
        backgroundColor: '#4D4D4D',
        color: '#ffffff',
        borderRadius: '10px',
    },
    formTitle: {
        fontFamily: 'Roboto',
        color: '#ffffff',
        fontWeight: 500
    }
}

const ReDelegateModal = ({ address, type, delegation, wrapSetShow, validators }) => {
    const [value, setValue] = useState('')
    const [selectVal, setSelectVal] = useState(0)
    const [showAdvance, setShowAdvance] = useState(false)
    const [gasAmount, setGasAmount] = useState('400000')
    const [isDoingTX, setIsDoingTx] = useState(false)

    const success = () => {
        notification.success({
            message: 'Transaction sent',
            duration: 1
        })
    };

    const error = (message) => {
        notification.error({
            message: 'Redelegate failed',
            description: message
        })
    };

    const handleChange = (value) => {
        setValue(value)
    }

    const checkDisable = () => {
        if (value === 0) {
            return true
        }
        return false
    }

    const handleChangeSelectVal = (e) => {
        setSelectVal(e.target.value)
    }

    const check = (e) => {
        setShowAdvance(e.target.checked)
    }

    const handleChangeGas = (value) => {
        setGasAmount(value)
    }


    const handleClick = async () => {
        setIsDoingTx(true)
        if (type === 'keplr') {
            const { offlineSigner } = await getKeplr();

            const stargate = await getStargateClient(offlineSigner)
            if (stargate != null) {
                const amount = value * 1000000
                const val = delegation.delegation.validator_address
                const validator_src_address = delegation.delegation.validator_address
                //TODO: add choice form to validator_dst_address - done
                const validator_dst_address = validators[selectVal].operator_address
                const gasLimit = parseInt(gasAmount)
                let stdFee = {
                    amount: [],
                    gas: gasLimit.toString(),
                }

                console.log("address")
                console.log(validator_src_address)
                console.log(validator_dst_address)
                const denom = process.env.REACT_APP_DENOM
                try {
                    const msgRelegate = makeBeginRedelegateMsg(address, validator_src_address, validator_dst_address, amount, denom)
                    await stargate.signAndBroadcast(address, [msgRelegate], stdFee).then(result => {
                        if (result.code == 0) {
                            setIsDoingTx(false)
                            success()
                            wrapSetShow(false)
                        } else {
                            setIsDoingTx(false)
                            error(result.rawLog)
                            wrapSetShow(false)
                        }
                    })
                    setIsDoingTx(false)
                    wrapSetShow(false)
                    success()
                }
                catch (e) {
                    setIsDoingTx(false)
                    wrapSetShow(false)
                    error(e.message)
                }
            }
        }
        else {
            //makeSignDocDelegateMsg, makeDelegateMsg
            // please set enviroment variable: DENOM, etc
            //import web3
            let web3 = await getWeb3Instance();
            const denom = process.env.REACT_APP_DENOM
            const chainId = process.env.REACT_APP_CHAIN_ID
            const memo = "Love From Dev Team"

            const gasLimit = parseInt(gasAmount)


            const validator_src_address = delegation.delegation.validator_address
            //TODO: add choice form to validator_dst_address
            const validator_dst_address = validators[selectVal].operator_address
            const amount = value * 1000000

            console.log("address")
            console.log(validator_src_address)
            console.log(validator_dst_address)

            const msgDelegate = makeBeginRedelegateMsg(address, validator_src_address, validator_dst_address, amount, denom)
            const signDocDelegate = makeSignDocBeginRedelegateMsg(address, validator_src_address, validator_dst_address, amount, denom)

            console.log(msgDelegate)
            console.log(signDocDelegate)

            const UIProcessing = function () {
                setIsDoingTx(false)
                wrapSetShow(false)
            }

            broadcastTransaction(address, msgDelegate, signDocDelegate, chainId, memo, gasLimit, web3, UIProcessing).then(() => {
                // wrapSetShow(false)
                // setIsDoingTx(false)
                // success()
            }).catch((e) => {
                setIsDoingTx(false)
                wrapSetShow(false)
                error(e.message)
            })

        }
    }

    return (
        <div>
            <div style={style.transfer}>
                <p style={style.formTitle}>Delegator</p>
                <div style={{
                    marginBottom: '20px',
                    width: '100%',
                    height: '40px',
                    borderRadius: '10px',
                    border: `2px solid #c4c4c4`,
                    fontSize: '1rem',
                    padding: '0.2rem',
                    paddingLeft: '0.5rem',
                    backgroundColor: '#C4C4C4',
                    color: '#9B9B9B'
                }}>
                    {address}
                </div>
                <p style={style.formTitle}>Validator</p>
                <div style={{
                    marginBottom: '20px',
                    width: '100%',
                    height: '40px',
                    borderRadius: '10px',
                    border: `2px solid #c4c4c4`,
                    fontSize: '1rem',
                    padding: '0.2rem',
                    paddingLeft: '0.5rem',
                    backgroundColor: '#C4C4C4',
                    color: '#9B9B9B'
                }}>
                    {delegation.delegation.validator_address}
                </div>
            </div>
            <div style={style.transfer}>
                <p style={style.formTitle}>To</p>
                <>
                    <Form.Select onChange={handleChangeSelectVal} style={style.formInput}>
                        {
                            validators.map((val, index) => (
                                <option key={index} value={index}>{val.description.moniker} ({`${val.commission.commission_rates.rate * 100}%`})</option>
                            ))
                        }
                    </Form.Select>
                </>
            </div>
            <div style={style.transfer}>
                <div style={{ marginBottom: '1rem', ...style.formTitle }}>Amount To Stake</div>
                <div style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '10px',
                    border: `2px solid #c4c4c4`,
                    fontSize: '1rem',
                    padding: 0,
                    backgroundColor: '#4D4D4D',
                    color: '#F6F3FB'
                }}>
                    <InputNumber style={{
                        width: '80%',
                        height: '100%',
                        fontSize: '1rem',
                        paddingTop: '0.2rem',
                        backgroundColor: '#4D4D4D',
                        color: '#F6F3FB',
                        borderRadius: '10px 0 0 10px'
                    }} min={0}
                        max={parseFloat(delegation.delegation.shares) / 1000000}
                        step={0.000001}
                        onChange={handleChange}
                        controls={false}
                        bordered={false}
                    />
                    <span style={{
                        height: '40px',
                        borderRadius: '10px',
                        border: `none`,
                        fontSize: '1.3rem',
                    }}>
                        |
                    </span>
                    <span style={{
                        width: '20%',
                        height: '100%',
                        borderRadius: '10px',
                        border: `none`,
                        fontSize: '1rem',
                        textAlign: 'center',
                        marginLeft: '2em'
                    }}>
                        AN1
                    </span>
                </div>
            </div>
            <div>
                <Checkbox onChange={check} style={{ color: '#F6F3FB', fontSize: '1.2rem', fontFamily: 'Roboto' }}>Advance</Checkbox>
            </div>
            {
                showAdvance && (
                    <div style={style.transfer}>
                        <div style={{ marginBottom: '1rem', ...style.formTitle }}>Set Gas</div>
                        <div style={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '10px',
                            border: `2px solid #c4c4c4`,
                            fontSize: '1rem',
                            padding: 0,
                            backgroundColor: '#4D4D4D',
                            color: '#F6F3FB'
                        }}>
                            <InputNumber style={{
                                width: '80%',
                                height: '100%',
                                fontSize: '1rem',
                                paddingTop: '0.2rem',
                                backgroundColor: '#4D4D4D',
                                color: '#F6F3FB',
                                borderRadius: '10px 0 0 10px'
                            }} min={0}
                                step={1}
                                onChange={handleChangeGas}
                                defaultValue={parseInt(gasAmount)}
                                controls={false}
                                bordered={false}
                            />
                            <span style={{
                                height: '40px',
                                borderRadius: '10px',
                                border: `none`,
                                fontSize: '1.3rem',
                            }}>
                                |
                            </span>
                            <span style={{
                                width: '20%',
                                height: '100%',
                                borderRadius: '10px',
                                border: `none`,
                                fontSize: '1rem',
                                textAlign: 'center',
                                marginLeft: '2em'
                            }}>
                                UAN1
                            </span>
                        </div>
                    </div>
                )
            }
            {
                isDoingTX && (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', fontSize: '1rem' }}>
                        <ClipLoader style={{ marginTop: '5em' }} color={'#f0a848'} loading={isDoingTX} />
                    </div>
                )
            }
            <div style={style.button}>
                <button onClick={() => wrapSetShow(false)}
                    style={{
                        border: 0,
                        borderRadius: '10px',
                        width: '20%',
                        height: '2.5rem',
                        fontSize: '15px',
                        backgroundColor: '#C4C4C4',
                        color: '#ffffff',
                        fontFamily: 'Roboto',
                        marginRight: '20px'
                    }}>
                    Cancel
                </button>
                <button disabled={checkDisable()}
                    onClick={handleClick}
                    style={{
                        border: 0,
                        borderRadius: '10px',
                        width: '20%',
                        height: '2.5rem',
                        fontSize: '15px',
                        backgroundColor: '#67d686',
                        color: '#ffffff',
                        fontFamily: 'Roboto'
                    }}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default ReDelegateModal
