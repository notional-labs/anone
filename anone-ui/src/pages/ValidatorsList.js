import { useEffect, useState, useCallback } from 'react';
import { Image, } from 'antd';
import { getValidators, getLogo } from '../helpers/getValidators';
import { getTotal } from '../helpers/getBalances';
import "@fontsource/roboto"
import PacmanLoader from "react-spinners/PacmanLoader";
import notFound from '../assets/img/no-profile.png'
import { Modal, } from 'react-bootstrap';
import DelegateModal from '../components/DelegateModal';
import { getKeplr, } from '../helpers/getKeplr';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import helmet from '../assets/img/Grouphelmet.png'

const style = {
    table: {
        width: '100%',
        borderSpacing: '0 1em',
        borderCollapse: 'separate'
    },
    tblHeader: {
        backgroundColor: 'transparent',
    },
    tblContent: {
        borderRadius: '50px',
    },
    th: {
        padding: '10px 10px',
        textAlign: 'left',
        fontWeight: 700,
        fontSize: '24px',
        color: '#ffffff',
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
    },
    td: {
        padding: '0.7em',
        paddingLeft: '1em',
        paddingRight: '1em',
        textAlign: 'left',
        verticalAlign: 'middle',
        fontWeight: 700,
        fontSize: '24px',
        color: '#000000',
        fontFamily: 'Roboto',
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

const ValidatorsList = () => {
    const [validators, setValidators] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [defaultVal, setDefaultVal] = useState(0)
    const [setLogo, setSetLogo] = useState(false)
    const [state, setState] = useState('')

    useEffect(() => {
        (async () => {
            setLoading(true)
            setSetLogo(false)
            let vals = await getValidators(true)
            const totalSupply = getTotal(vals)
            vals.map((val) => {
                val.votingPowerPercentage = parseFloat(val.delegator_shares * 100 / totalSupply).toFixed(2)
            })
            let promises = []
            vals.forEach(val => {
                promises.push(getLogo(val.description.identity))
            })
            Promise.all(promises).then((logos) => {
                vals.map((val, index) => val.logo = logos[index])
                setSetLogo(true)
            })
            setValidators([...vals])
            setLoading(false)
        })()
    }, [])

    const wrapSetShow = useCallback((val) => {
        setShow(val)
    }, [setShow])

    const handleClick = async (index) => {
        if (!localStorage.getItem('accounts')) {
            const { accounts } = await getKeplr('dig-1')
            localStorage.setItem('accounts', JSON.stringify([{ account: accounts[0], type: 'keplr' }]))
        }
        setDefaultVal(index)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleOver = (e) => {
        e.target.style.backgroundColor = 'rgb(242, 242, 242, 0.7)'
    }

    const handleLeave = (e) => {
        e.target.style.backgroundColor = 'transparent'
    }


    const handleSort = () => {
        if (state === 'desc') {
            setState('asc')
            setValidators([...validators.sort((x, y) => x.delegator_shares - y.delegator_shares)])
        }
        else if (state === 'asc') {
            setState('desc')
            setValidators([...validators.sort((x, y) => y.delegator_shares - x.delegator_shares)])
        }
        else {
            setState('desc')
            setValidators([...validators.sort((x, y) => y.delegator_shares - x.delegator_shares)])
        }
    }

    return (
        !loading ? (
            <div style={{ padding: 140, paddingTop: 0 }}>
                <div style={style.breadcrumb}>
                    <span>
                        <Link to='/' style={{ color: '#ffffff', fontWeight: 500 }}>
                            Homepage
                        </Link>
                    </span>
                    <span style={{ color: '#ffffff', fontWeight: 500 }}>
                        {' / '}
                    </span>
                    <span style={{ color: '#16ab40' }}>
                        Staking
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
                    VALIDATOR
                </div>
                <div style={{
                    backgroundColor: '#27e35c',
                    borderRadius: '30px',
                    padding: 10,
                    paddingLeft: 25,
                    paddingRight: 25,
                    paddingBottom: 25
                }}>
                    <table style={style.table}>
                        <thead style={style.tblHeader}>
                            <tr>
                                <th style={{ ...style.th, width: '40%' }}>Validator</th>
                                <th style={{ ...style.th, width: '20%', textAlign: 'center' }}>
                                    <button style={{
                                        backgroundColor: 'transparent',
                                        border: 0,
                                        fontWeight: '700',
                                        fontSize: '1.3rem',
                                        color: '#fff',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Roboto',
                                        padding: 10,
                                        borderRadius: '20px'
                                    }} onMouseEnter={handleOver}
                                        onMouseLeave={handleLeave}
                                        onClick={handleSort}>
                                        Voting power
                                        {state === 'desc' ? <CaretDownOutlined /> : state === 'asc' && <CaretUpOutlined />}
                                    </button>
                                </th>
                                <th style={{ ...style.th, width: '20%', textAlign: 'center' }}>Commision</th>
                                <th style={{ ...style.th, width: '20%', borderRight: 0, textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody style={style.tblContent}>
                            {validators.map((val, index) => {
                                return (
                                    <tr key={index} style={{ backgroundColor: '#ffffff', marginBottom: 20 }}>
                                        <td style={{ ...style.td, borderRadius: '30px 0 0 30px', }}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div style={{
                                                    borderRadius: '50%',
                                                    backgroundImage: setLogo ? `url(${val.logo})` || `url(${notFound})` : `url(${notFound})`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    width: '60px',
                                                }}>
                                                    {/* <Image
                                                        width={45}
                                                        src={helmet}
                                                        style={{
                                                            borderRadius: '100%',
                                                            textAlign: 'left',
                                                            position: 'relative',
                                                            marginTop: '-70%',
                                                            marginLeft: '-30%'
                                                        }}
                                                        preview={false}
                                                    /> */}
                                                </div>

                                                <div style={{ marginLeft: '1rem' }} >
                                                    <div style={{ color: '#2C223E', fontSize: '24px', fontWeight: 700 }}>{val.description.moniker}</div>
                                                    <div style={{ fontSize: '15px', fontWeight: 400 }}>{val.description.website ? val.description.website : val.description.identity}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ ...style.td, textAlign: 'center' }}>
                                            <div>{`${parseInt(val.delegator_shares / 1000000)} AN1`}</div>
                                            <div style={{ fontSize: '15px' }}>{`${val.votingPowerPercentage} %`} </div>
                                        </td>
                                        <td style={{ ...style.td, textAlign: 'center' }}>{`${val.commission.commission_rates.rate * 100} %`}</td>
                                        <td style={{ ...style.td, textAlign: 'center', borderRadius: '0 30px 30px 0', color: '#ffffff' }}>
                                            <button style={{
                                                backgroundColor: '#631bf2',
                                                border: 'none',
                                                borderRadius: '30px',
                                                width: '60%',
                                                padding: '1.5em',
                                                fontSize: '15px',
                                                fontWeight: 700,
                                                boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.25)'
                                            }} onClick={async () => await handleClick(index)}>
                                                Delegate
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <>
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
                                Delegate Token
                            </div>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#4D4D4D', }}>
                            <DelegateModal validators={validators} wrapSetter={wrapSetShow} defaultVal={defaultVal} />
                        </Modal.Body>
                    </Modal>
                </>
            </div >
        ) : (
            <div style={{ marginRight: '10rem', paddingTop: '10rem', height: '77vh' }}>
                <PacmanLoader color={'#33d460'} loading={loading} size={100} />
            </div>
        )
    )
}

export default ValidatorsList
