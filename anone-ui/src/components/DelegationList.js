
import { Typography, Tooltip, Skeleton } from 'antd';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getValidators } from '../helpers/getValidators';
import { getTotal } from '../helpers/getBalances';
import WithDrawModal from './WithDrawModal';
import UndelegateModal from './UndelegateModal';
import ReDelegateModal from './ReDelegateModal';
import { RiLogoutBoxRLine, } from "react-icons/ri";
import { TiArrowRepeat } from "react-icons/ti";
import { AiOutlineGift } from "react-icons/ai";


const { Title, Paragraph } = Typography;

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        border: 0,
        borderRadius: '10px',
        width: '100%',
        marginBottom: 0,
        marginLeft: 0,
        fontFamily: 'Roboto',
        fontWeight: 300,
        backgroundColor: '#27e35c',
        color: '#FFFFFF',
        padding: '2em',
        paddingTop: '1em',
        paddingBottom: '1em'
    },
    actionButton: {
        border: 'solid 2px #3B2D52',
        backgroundColor: 'transparent',
        padding: 5,
        fontFamily: 'Roboto',
        fontSize: '1rem'
    },
    table: {
        width: '100%',
    },
    tdlHeader: {
        backgroundColor: 'transparent',
        borderBottom: 'solid 1px black'
    },
    tdlContent: {
        marginTop: '0px',
        borderRadius: '50px',
        paddingTop: 0
    },
    th: {
        padding: '15px 15px',
        textAlign: 'left',
        fontWeight: '700',
        fontSize: '15px',
        color: '#000000',
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
    },
    td: {
        padding: '15px',
        textAlign: 'left',
        verticalAlign: '500',
        fontWeight: 'lighter',
        fontSize: '17px',
        color: '#000000',
        fontFamily: 'Roboto',
        width: '20%',
        lineHeight: '18px'
    }
}

const DelegationList = ({ address, type, delegations, rewards, }) => {
    const [validators, setValidators] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectVal, setSelectVal] = useState(0)
    const [showWithdraw, setShowWithdraw] = useState(false)
    const [showUnbonding, setShowUnbonding] = useState(false)
    const [showRedelegate, setShowRedelegate] = useState(false)

    const wrapSetShowWithdrawModal = useCallback((val) => {
        setShowWithdraw(val)
    }, [setShowWithdraw])

    const wrapSetShowUnbondModal = useCallback((val) => {
        setShowUnbonding(val)
    }, [setShowUnbonding])

    const wrapSetShowRedelegate = useCallback((val) => {
        setShowRedelegate(val)
    }, [setShowRedelegate])

    useEffect(() => {
        (async () => {
            setLoading(true)
            let vals = await getValidators(true)
            const totalSupply = getTotal(vals)
            vals = vals.sort((x, y) => y.delegator_shares - x.delegator_shares)
            vals.map((val) => {
                val.votingPowerPercentage = parseFloat(val.delegator_shares * 100 / totalSupply).toFixed(2)
            })
            setValidators([...vals])
            setLoading(false)
        })()
    }, [])

    const handleOver = (e) => {
        e.target.style.backgroundColor = 'rgb(255, 255, 255, 0.3)'
    }

    const handleLeave = (e) => {
        e.target.style.backgroundColor = 'transparent'
    }

    const handleClickWithdraw = (val) => {
        setShowWithdraw(true)
        setSelectVal(val)
    }

    const handleClickUnbonding = (val) => {
        setShowUnbonding(true)
        setSelectVal(val)
    }

    const handleClickRedelegate = (val) => {
        setShowRedelegate(true)
        setSelectVal(val)
    }

    const handleCloseWithdraw = () => {
        setShowWithdraw(false)
    }

    const handleCloseRedelegate = () => {
        setShowWithdraw(false)
    }

    const handleCloseUnbond = () => {
        setShowUnbonding(false)
    }

    return (
        <div style={{ padding: 20 }}>
            <div style={style.container}>
                <Title style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, fontFamily: 'Roboto' }}>
                    Delegations
                </Title>
            </div>
            <div style={{ backgroundColor: 'rgb(255, 255, 255, 1)', borderRadius: '20px', padding: '2em', paddingTop: '1em', paddingBottom: '1em' }}>
                <div style={{ width: '8%', float: 'right', marginBottom: '1em' }}>
                    <Link to='/staking' style={{ width: '30%' }}>
                        <button style={style.button}>
                            Delegate
                        </button>
                    </Link>
                </div>
                {!loading ? (
                    <table cellPadding="0" cellSpacing="0" border="0" style={style.table}>
                        <thead style={style.tdlHeader}>
                            <tr>
                                <th style={{ ...style.th, width: '20%' }}>Validator</th>
                                <th style={{ ...style.th, width: '10rem', textAlign: 'left' }}>Token</th>
                                <th style={{ ...style.th, width: '10rem', textAlign: 'left' }}>Reward</th>
                                <th style={{ ...style.th, width: '10rem', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody style={style.tdlContent}>
                            {rewards.map((reward, index) => {
                                return (
                                    <tr key={index} style={{ backgroundColor: '#ffffff', }}>
                                        <td style={style.td}>
                                            {validators.filter(x => x.operator_address === reward.validator_address).length > 0 && validators.filter(x => x.operator_address === reward.validator_address)[0].description.moniker}
                                        </td>
                                        <td style={{ ...style.td, textAlign: 'left' }}>
                                            {parseInt(delegations.filter(x => x.delegation.validator_address === reward.validator_address)[0].delegation.shares) / 1000000 || 0} AN1
                                        </td>
                                        <td style={{ ...style.td, textAlign: 'left', }}>
                                            {reward.reward.length > 0 && parseInt(reward.reward[0].amount) / 1000000 || 0} AN1
                                        </td>
                                        <td style={{ ...style.td, textAlign: 'left', width: '20%' }}>
                                            <Tooltip placement="top" title='Withdraw Reward'>
                                                <button onClick={() => handleClickWithdraw(index)}
                                                    style={{ ...style.actionButton, paddingLeft: '10px', borderRadius: '10px 0 0 10px', width: '20%' }}
                                                    onMouseEnter={handleOver}
                                                    onMouseLeave={handleLeave}>
                                                    <AiOutlineGift style={{ fontSize: '1.2rem' }} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip placement="top" title='Redelegate'>
                                                <button onClick={() => handleClickRedelegate(index)}
                                                    style={{ ...style.actionButton, width: '20%' }}
                                                    onMouseEnter={handleOver}
                                                    onMouseLeave={handleLeave}>
                                                    <TiArrowRepeat style={{ fontSize: '1.2rem' }} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip placement="top" title='Unbonding'>
                                                <button onClick={() => handleClickUnbonding(index)}
                                                    style={{ ...style.actionButton, paddingRight: '10px', borderRadius: '0 10px 10px 0', width: '20%' }}
                                                    onMouseEnter={handleOver}
                                                    onMouseLeave={handleLeave}>
                                                    <RiLogoutBoxRLine style={{ fontSize: '1.2rem' }} />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <Skeleton active/>
                )}
            </div>
            <>
                <Modal show={showWithdraw} onHide={handleCloseWithdraw} backdrop="static" >
                    <Modal.Header style={{
                        backgroundColor: '#4D4D4D',
                        color: '#27e35c',
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        fontWeight: 400,
                        border: 0
                    }}>
                        <div>
                            Withdraw Rewards
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#4D4D4D', }}>
                        <WithDrawModal address={address}
                            type={type}
                            validator={rewards[selectVal] && rewards[selectVal].validator_address}
                            wrapSetShow={wrapSetShowWithdrawModal} />
                    </Modal.Body>
                </Modal>
            </>
            <>
                <Modal show={showRedelegate} onHide={handleCloseRedelegate} backdrop="static" >
                    <Modal.Header style={{
                        backgroundColor: '#4D4D4D',
                        color: '#27e35c',
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        fontWeight: 400,
                        border: 0
                    }}>
                        <div>
                            Redelegate Token
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#4D4D4D', }}>
                        <ReDelegateModal address={address}
                            type={type}
                            delegation={delegations[selectVal]}
                            wrapSetShow={wrapSetShowRedelegate}
                            validators={validators} />
                    </Modal.Body>
                </Modal>
            </>
            <>
                <Modal show={showUnbonding} onHide={handleCloseUnbond} backdrop="static" >
                    <Modal.Header style={{
                        backgroundColor: '#4D4D4D',
                        color: '#27e35c',
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        fontWeight: 400,
                        border: 0
                    }}>
                        <div>
                            Unbond Token
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#4D4D4D', }}>
                        <UndelegateModal address={address}
                            type={type}
                            delegation={delegations[selectVal]}
                            wrapSetShow={wrapSetShowUnbondModal} />
                    </Modal.Body>
                </Modal>
            </>
        </div>
    )
}

export default DelegationList
