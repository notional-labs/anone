import { Typography, Breadcrumb } from 'antd';
import { PieChart } from 'react-minimal-pie-chart';
import DelegationList from '../components/DelegationList';
import {
    useParams,
    Link
} from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { Modal, } from 'react-bootstrap'
import TransferModal from "../components/TransferModal"
import { BsGraphUp, BsGraphDown, BsWallet, BsLock } from "react-icons/bs";
import { getAsset, getTotalDelegate, getTotalUnbonding, getPrice, convertAsset } from '../helpers/getBalances';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import TxList from '../components/TxList';
import IBCTransferModal from '../components/IBCTransfer';

const { Title, Paragraph } = Typography;

const style = {
    container: {
        padding: 140,
        paddingTop: 0
    },
    assetBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 0
    },
    assetChart: {
        padding: '3em',
        paddingTop: 0
    },
    asset: {
        backgroundColor: '#27e35c',
        borderRadius: '30px',
        marginBottom: '20px',
        color: '#696969',
        fontFamily: 'Roboto',
        marginTop: '20px',
    },
    assetButtonBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
    },
    delegation: {
        backgroundColor: '#27e35c',
        borderRadius: '30px',
        marginBottom: '20px',
        color: '#bdbdbd',
        fontFamily: 'Roboto',
        marginTop: '5rem',
        padding: 20
    },
    button: {
        border: 0,
        borderRadius: '30px',
        width: '100%',
        marginBottom: 0,
        marginLeft: 0,
        fontFamily: 'Roboto',
        fontWeight: 600,
        backgroundColor: '#2e2c27',
        color: '#F6F3FB',
        padding: '2em',
        paddingTop: '1em',
        paddingBottom: '1em'
    },
    icon: {
        fontSize: '1.5rem',
    },
    li: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignContent: 'center',
        marginBottom: '0.5em',
    },
    iconDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignContent: 'stretch'
    },
    breadcrumb: {
        textAlign: 'left',
        fontWeight: 700,
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Roboto',
        paddingBottom: '0.5em'
    },
}

const AccountDetail = ({ accounts }) => {
    const [show, setShow] = useState(false)
    const [showIbc, setShowIbc] = useState(false)
    const [selectAcc, setSelectAcc] = useState(0)
    const [asset, setAsset] = useState({
        balance: '',
        delegation: '',
        reward: '',
        unbonding: ''
    })
    const [reward, setReward] = useState([])
    const [delegation, setDelegation] = useState([])
    const [total, setTotal] = useState(0)
    let { id } = useParams();


    const wrapSetShowTransferModal = useCallback((val) => {
        setShow(val)
    }, [setShow])

    const wrapSetShowIBCTransferModal = useCallback((val) => {
        setShowIbc(val)
    }, [setShowIbc])

    const handleClose = () => {
        setShow(false)
    }

    const handleClick = () => {
        setShow(true)
    }

    const handleClickIbc = () => {
        setShowIbc(true)
    }

    const handleCloseIbc = () => {
        setShowIbc(false)
    }


    useEffect(() => {
        (async () => {
            accounts.map((account, index) => {
                if (account.type === 'keplr') {
                    if (account.account.address === id) {
                        setSelectAcc(index)
                    }
                }
                if (account.type === 'metamask') {
                    if (account.account === id) {
                        setSelectAcc(index)
                    }
                }
            })
            const asset = await getAsset(id)

            const balance = asset[0].length > 0 && asset[0][0].length > 0 ? asset[0][0][0].amount : 0
            const delegation = asset[1].delegation_responses.length > 0 ? getTotalDelegate(asset[1].delegation_responses) : 0
            const reward = asset[2].total.length > 0 ? asset[2].total[0].amount : 0
            const unbonding = asset[3].unbonding_responses.length > 0 ? getTotalUnbonding(asset[3].unbonding_responses) : 0

            setAsset({
                balance,
                delegation,
                reward,
                unbonding
            })

            // const res = await getPrice()
            // const usd = res['dig-chain'].usd || 0
            
            // const totalAsset = convertAsset(balance, delegation, reward, unbonding, usd)

            // setTotal(totalAsset)
            setDelegation([...asset[1].delegation_responses])
            setReward([...asset[2].rewards])
        })()
    }, [id])

    return (
        <div style={style.container}>
            <div style={style.breadcrumb}>
                <span>
                    <Link to='/' style={{ color: '#ffffff', fontWeight: 500 }}>
                        Homepage
                    </Link>
                </span>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>
                    {' / '}
                </span>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>
                    <Link to='/accounts' style={{ color: '#ffffff', fontWeight: 500 }}>
                        Accounts
                    </Link>
                </span>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>
                    {' / '}
                </span>
                <span style={{ color: '#16ab40' }}>
                    {id}
                </span>
            </div>
            <div style={{
                textAlign: 'left',
                fontSize: '48px',
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontWeight: 700,
                marginBottom: '1.3em'
            }}>
                Detail
            </div>
            <div style={style.asset}>
                <div style={style.assetBlock}>
                    <Title style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, fontFamily: 'Roboto' }}>
                        Assets
                    </Title>
                    {/* <div style={{ ...style.assetButtonBlock, width: '20%', padding: 0 }}>
                        <div style={{ width: '50%', marginRight: '10px' }}>
                            <button style={style.button} onClick={handleClick}>
                                Transfer
                            </button>
                        </div>
                        <div style={{ width: '100%' }}>
                            <button style={{ ...style.button, backgroundColor: '#ff5d54' }} onClick={handleClickIbc}>
                                IBC Transfer
                            </button>
                        </div>
                    </div> */}
                </div>
                <div style={style.assetChart}>
                    <div
                        className='asset-block'
                    >
                        <div
                            className='chart'
                        >
                            <PieChart
                                animationDuration={20000}
                                startAngle={-90}
                                radius={35}
                                data={[
                                    { title: 'Balance', value: parseInt(asset.balance) / 1000000 || 0, color: '#D2DDCF' },
                                    { title: 'Delegation', value: parseInt(asset.delegation) / 1000000 || 0, color: '#C0C9D8' },
                                    { title: 'Reward', value: parseInt(asset.reward) / 1000000 || 0, color: '#F9D38C' },
                                    { title: 'Undonding', value: parseInt(asset.unbonding) / 1000000 || 0, color: '#FCB3A4' }
                                ]}
                                style={{
                                    height: '100%',
                                }}
                            >
                                <PieChart
                                    radius={25}
                                    data={[
                                        { title: 'asset', value: 1, color: 'rgb(255, 255, 255, 1)' },
                                    ]}
                                    style={{ marginLeft: '50px', }}
                                />
                            </PieChart>
                        </div>
                        <ul style={{
                            textAlign: 'left',
                            margin: 0,
                            padding: '2em',
                            listStyleType: 'none',
                            textAlign: 'left',
                            fontSize: '1.25rem',
                            width: '100%',
                            backgroundColor: 'rgb(255, 255, 255, 1)',
                            borderRadius: '20px'
                        }}>
                            <li style={style.li}>
                                <div style={style.iconDiv}>
                                    <div style={{ backgroundColor: 'rgb(61, 255, 148, 0.4)', height: '100%', padding: '0.5em', borderRadius: '10px' }}>
                                        <BsWallet style={{ ...style.icon, color: '#93A98D' }} />
                                    </div>
                                    <p style={{ marginLeft: '10px', fontWeight: 500, marginBottom: 0 }}>
                                        <span style={{
                                            display: 'inline-block',
                                            verticalAlign: 'middle',
                                            lineheight: 'normal',
                                            marginTop: '0.5em',
                                            color: '#000000'
                                        }}>
                                            Balance
                                        </span>
                                    </p>
                                </div>
                                <div style={{ fontWeight: 500 }}>
                                    <span style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        lineheight: 'normal',
                                        marginTop: '0.5em',
                                        color: '#000000'
                                    }}>
                                        {parseInt(asset.balance) / 1000000 || 0} AN1
                                    </span>
                                </div>
                            </li>
                            <li style={style.li}>
                                <div style={style.iconDiv}>
                                    <div style={{ backgroundColor: 'rgb(140, 129, 252, 0.4)', height: '100%', padding: '0.5em', borderRadius: '10px' }}>
                                        <BsLock style={{ ...style.icon, color: '#0B1321' }} />
                                    </div>
                                    <p style={{ marginLeft: '10px', fontWeight: 500, marginBottom: 0 }}>
                                        <span style={{
                                            display: 'inline-block',
                                            verticalAlign: 'middle',
                                            lineheight: 'normal',
                                            marginTop: '0.5em',
                                            color: '#000000'
                                        }}>
                                            Delegation
                                        </span>
                                    </p>
                                </div>
                                <div style={{ fontWeight: 500 }}>
                                    <span style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        lineheight: 'normal',
                                        marginTop: '0.5em',
                                        color: '#000000'
                                    }}>
                                        {parseInt(asset.delegation) / 1000000 || 0} AN1
                                    </span>
                                </div>
                            </li>
                            <li style={style.li}>
                                <div style={style.iconDiv}>
                                    <div style={{ backgroundColor: 'rgb(255, 174, 97, 0.4)', height: '100%', padding: '0.5em', borderRadius: '10px' }}>
                                        <BsGraphUp style={{ ...style.icon, color: '#AE8D4F' }} />
                                    </div>
                                    <p style={{ marginLeft: '10px', fontWeight: 500, marginBottom: 0 }}>
                                        <span style={{
                                            display: 'inline-block',
                                            verticalAlign: 'middle',
                                            lineheight: 'normal',
                                            marginTop: '0.5em',
                                            color: '#000000'
                                        }}>
                                            Reward
                                        </span>
                                    </p>
                                </div>
                                <div style={{ fontWeight: 500 }}>
                                    <span style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        lineheight: 'normal',
                                        marginTop: '0.5em',
                                        color: '#000000'
                                    }}>
                                        {parseInt(asset.reward) / 1000000 || 0} AN1
                                    </span>
                                </div>
                            </li>
                            <li style={style.li}>
                                <div style={style.iconDiv}>
                                    <div style={{ backgroundColor: 'rgb(255, 115, 116, 0.4)', height: '100%', padding: '0.5em', borderRadius: '10px' }}>
                                        <BsGraphDown style={{ ...style.icon, color: '#BD6B5A' }} />
                                    </div>
                                    <p style={{ marginLeft: '10px', fontWeight: 500, marginBottom: 0 }}>
                                        <span style={{
                                            display: 'inline-block',
                                            verticalAlign: 'middle',
                                            lineheight: 'normal',
                                            marginTop: '0.5em',
                                            color: '#000000'
                                        }}>
                                            Unbonding
                                        </span>
                                    </p>
                                </div>
                                <div style={{ fontWeight: 500 }}>
                                    <span style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        lineheight: 'normal',
                                        marginTop: '0.5em',
                                        color: '#000000'
                                    }}>
                                        {parseInt(asset.unbonding) / 1000000 || 0} AN1
                                    </span>
                                </div>
                            </li>
                            <li>
                                <hr style={{ color: 'black' }} />
                            </li>
                            <li style={{ ...style.li, justifyContent: 'end' }}>
                                <div style={{ fontWeight: 600, fontSize: '1.5rem' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        lineheight: 'normal',
                                        color: '#000000'
                                    }}>
                                        Total {total}$
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ ...style.delegation, marginTop: '4em', paddingTop: 0 }}>
                <DelegationList address={id} type={accounts[selectAcc] && accounts[selectAcc].type} delegations={delegation} rewards={reward} />
            </div>
            <div style={{ ...style.delegation, marginTop: '4em', paddingTop: 20 }}>
                <TxList address={id} />
            </div>
            {/* <>
                <Modal show={show} onHide={handleClose} backdrop="static" >
                    <Modal.Header style={{
                        backgroundColor: '#4D4D4D',
                        color: '#27e35c',
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        fontWeight: 400,
                        border: 0
                    }}>
                        <div>
                            Transfer Token
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#4D4D4D', }}>
                        <TransferModal account={accounts[selectAcc]} wrapSetShow={wrapSetShowTransferModal} />
                    </Modal.Body>
                </Modal>
            </>
            <>
                <Modal show={showIbc} onHide={handleCloseIbc} backdrop="static" >
                    <Modal.Header style={{ backgroundColor: '#d6d6d6', color: '#696969', fontFamily: 'Roboto', fontSize: '1.2rem', fontWeight: 600 }}>
                        <div>
                            IBC Transfer Token
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#1f1f1f', }}>
                        <IBCTransferModal account={accounts[selectAcc]} wrapSetShow={wrapSetShowIBCTransferModal} />
                    </Modal.Body>
                </Modal>
            </> */}
        </div>
    )
}

export default AccountDetail