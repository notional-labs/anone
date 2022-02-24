import { Typography, Tooltip, } from 'antd';
import { getBalance } from '../helpers/getBalances';
import { useEffect, useState } from 'react';
import {
    Link,
} from "react-router-dom";
import { BiX } from "react-icons/bi";


const { Title, Paragraph } = Typography;

const style = {
    container: {
        backgroundColor: '#F4F4F4',
        padding: 50,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: '20px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    div: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button: {
        border: 0,
        borderRadius: '20px',
        width: '120px',
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Roboto',
        fontWeight: 300,
        padding: '2em',
        paddingTop: '1em',
        paddingBottom: '1em'
    },
    buttonDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
    }
}

const ProfileCard = ({ account, index, wrapSetSelect, wrapSetShow, wrapSetAccounts }) => {
    const [amount, setAmount] = useState('')

    useEffect(() => {
        (async () => {
            if (account.type === 'keplr') {
                const balance = await getBalance(account.account.address)
                const balanceAmount = balance.length > 0 ? balance[0][0].amount : 0

                setAmount(balanceAmount)
            }
            else {
                const balance = await getBalance(account.account)
                const balanceAmount = balance.length > 0 ? balance[0][0].amount : 0

                setAmount(balanceAmount)
            }
        })()
    }, [account])

    const handleClick = () => {
        wrapSetSelect(index)
        wrapSetShow(true)
    }

    const handleRemove = () => {
        const accounts = JSON.parse(localStorage.getItem('accounts'))
        const filterAccouts = accounts.filter(x => x.type === 'keplr' && x.account.address !== account.account.address || x.type === 'metamask' && x.account !== account.account)
        localStorage.setItem('accounts', JSON.stringify([...filterAccouts]))
        wrapSetAccounts(filterAccouts)
    }

    return (
        <div style={style.container}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Tooltip placement="top" title='Remove'>
                    <button style={{
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: '#000000',
                        backgroundColor: 'transparent',
                        border: 0,
                        position: 'relative',
                        marginRight: '-40px'
                    }} onClick={handleRemove}
                    >
                        <BiX/>
                    </button>
                </Tooltip>
            </div>
            <Paragraph copyable={{ text: account.type === 'keplr' ? account.account.address && account.account.address.trim() : account.account && account.account.trim() }}
                style={{
                    color: '#2a3158',
                    fontFamily: 'Roboto',
                    textAlign: 'left',
                    backgroundColor: 'white',
                    padding: 25,
                    marginBottom: '1.5em',
                    borderRadius: '20px',
                    boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.25)'
                }}>
                {account.type === 'keplr' ? (account.account.address.length > 100 ? `${account.account.address.substring(0, 100)}... ` : `${account.account.address} `) : (account.account.length > 100 ? `${account.account.substring(0, 100)}... ` : `${account.account} `)}
            </Paragraph>
            <Paragraph style={{
                color: '#2a3158',
                fontFamily: 'Roboto',
                textAlign: 'left',
                backgroundColor: 'white',
                padding: 25,
                borderRadius: '20px',
                boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.25)'
            }}>
                {parseFloat(amount) / 1000000 || 0} AN1
            </Paragraph>
            <div style={style.buttonDiv}>
                <button style={{ ...style.button, backgroundColor: '#27e35c', color: '#FFFFFF', marginRight: '20px'}} onClick={handleClick}>
                    Transfer
                </button>
                <Link to={account.type === 'keplr' ? account.account.address : account.account}>
                    <button style={{ ...style.button, backgroundColor: '#27e35c', color: '#FFFFFF', }}>
                        Detail
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProfileCard