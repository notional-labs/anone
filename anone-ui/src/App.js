import './App.css';
import { Modal, } from 'react-bootstrap';
import { useCallback, useState } from 'react';
import ConnectButton from './components/ConnectButton';
import AccountDetail from './pages/AccountDetail';
import { getKeplr, addDig } from './helpers/getKeplr';
import ValidatorsList from './pages/ValidatorsList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation
} from "react-router-dom";
import logo from './assets/img/another1_logo.png';
import keplrLogo from './assets/img/keplr.png'
import metaMaskLogo from './assets/img/metamask.png'
import { Image, message } from 'antd';
import { getWeb3Instance } from "./helpers/ethereum/lib/metamaskHelpers";
import { GithubFilled, } from '@ant-design/icons'
import "@fontsource/roboto"
import AccountList from './pages/AccountList';
import ProposalList from './pages/ProposalList';
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import ProposalDetail from './pages/ProposalDetail';
import FrontPage from './pages/FrontPage';


const style = {
  button: {
    marginTop: '5rem',
  },
  divButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 140,
    paddingTop: 20,
    paddingBottom: '6em',
  },
  tabButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    verticalAlign: 'center'
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    padding: 90,
    paddingTop: 0,
    paddingBottom: 0
  }
}

const App = () => {
  const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem('accounts')) || [])
  const [show, setShow] = useState(false)
  let location = useLocation();

  const wrapSetShow = useCallback((val) => {
    setShow(val)
  }, [setShow])

  const wrapSetAccounts = useCallback((val) => {
    setAccounts([...val])
  }, [setAccounts])

  const handleClose = () => {
    setShow(false)
  }

  const warning = (val) => {
    message.warning(val, 1)
  }

  const connect = async (val) => {
    if (val === 'keplr') {
      const { accounts } = await getKeplr()
      console.log(accounts)
      if (!localStorage.getItem('accounts')) {
        localStorage.setItem('accounts', JSON.stringify([{ account: accounts[0], type: 'keplr' }]))
        setAccounts([...{ account: accounts[0], type: 'keplr' }])
      }
      else if (localStorage.getItem('accounts')) {
        let accountsList = JSON.parse(localStorage.getItem('accounts'))
        if (accountsList.filter(acc => acc.account.address === accounts[0].address).length === 0) {
          accountsList.push({ account: accounts[0], type: 'keplr' })
          localStorage.setItem('accounts', JSON.stringify(accountsList))
          setAccounts([...accountsList])
          warning('Success')
        }
        else {
          warning('This wallet account already exist')
        }
      }
    }
    else {
      let web3 = await getWeb3Instance();
      try {
        const accounts = (await web3.eth.getAccounts());
        if (!localStorage.getItem('accounts')) {
          localStorage.setItem('accounts', JSON.stringify([{ account: accounts[0], type: 'metamask' }]))
        }
        if (localStorage.getItem('accounts')) {
          let accountsList = JSON.parse(localStorage.getItem('accounts'))
          if (accountsList.filter(acc => acc.type === "metamask" && acc.account === accounts[0]).length === 0) {
            accountsList.push({ account: accounts[0], type: 'metamask' })
            localStorage.setItem('accounts', JSON.stringify(accountsList))
            setAccounts([...accountsList])
            warning('Success')
          }
          else {
            warning('This wallet account already exist')
          }
        }
      } catch {
        warning('Check if you have login into Metmask')
      }
      //metamask logic
    }
  }

  return (
    <div className="App container-fluid">
      <div style={style.navbar}>
        <div style={{ paddingTop: '1rem' }}>
          <Link to='/'>
            <Image width={100}
              src={logo}
              preview={false}
            />
          </Link>
        </div>
        <div className='nav-bar'>
          <ul
            className='nav-button'
            style={{ listStyleType: 'none', paddingTop: '30px' }}>
            <li>
              <NavLink to='/accounts'>
                <button style={{
                  marginRight: '3.5em',
                  fontSize: '24px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  padding: 0,
                  paddingTop: 5,
                  paddingBottom: 30,
                  border: 0,
                  fontFamily: 'Roboto',
                  borderBottom: location.pathname.includes('/accounts') ? 'solid 2px #27e35c' : 'none',
                  lineHeight: '100%',
                  fontStyle: 'regular',
                }}>
                  Accounts
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to='/staking'>
                <button style={{
                  marginRight: '3.5em',
                  fontSize: '24px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  padding: 0,
                  paddingTop: 5,
                  paddingBottom: 30,
                  border: 0,
                  fontFamily: 'Roboto',
                  borderBottom: location.pathname.includes('/staking') ? 'solid 2px #27e35c' : 'none',
                  lineHeight: '100%',
                  fontStyle: 'regular'
                }}>
                  Staking
                </button>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to='/proposals'>
                <button style={{
                  marginRight: '3.5em',
                  fontSize: '24px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  padding: 0,
                  paddingTop: 5,
                  paddingBottom: 30,
                  border: 0,
                  fontFamily: 'Roboto',
                  borderBottom: location.pathname.includes('/proposals') ? 'solid 2px #27e35c' : 'none',
                  lineHeight: '100%',
                  fontStyle: 'regular'
                }}>
                  Proposals
                </button>
              </NavLink>
            </li> */}
            <li>
              <ConnectButton wrapSetShow={wrapSetShow} />
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<FrontPage/>} />
        <Route exact path="/staking" element={<ValidatorsList />} />
        <Route exact path="/accounts" element={<AccountList accounts={accounts} wrapSetAccounts={wrapSetAccounts} />} />
        <Route exact path="/accounts/:id" element={<AccountDetail accounts={accounts} />} />
        <Route exact path="/proposals" element={<ProposalList />} />
        <Route exact path="/proposals/:id" element={<ProposalDetail />} />
      </Routes>
      <div style={style.contact}>
        <ul style={{ ...style.tabButton, listStyleType: 'none', }}>
          <li style={{
            fontSize: '2rem',
            color: '#ffffff',
            marginRight: '1em',
          }}>
            <a href='https://github.com/notional-labs' target='_blank'>
              <GithubFilled style={{ color: '#ffffff', }} />
            </a>
          </li>
          <li style={{
            fontSize: '2.5rem',
            color: '#ffffff',
            marginRight: '1em',
          }}>
            <a href='https://discord.gg/UTNjQbGA' target='_blank'>
              <FaDiscord style={{ color: '#ffffff', }} />
            </a>
          </li>
          {/* <li style={{
            fontSize: '2.5rem',
            color: '#ffffff',
            marginRight: '1em',
          }}>
            <a href='https://t.me/digchain_official' target='_blank'>
              <FaTelegramPlane style={{ color: '#ffffff', }} />
            </a>
          </li> */}
        </ul>
      </div>
      <>
        <Modal className="border-radius-20" show={show} onHide={handleClose} centered={true}>
          <Modal.Header style={{
            backgroundColor: '#4D4D4D',
            color: '#27e35c',
            fontFamily: 'roboto',
            fontSize: '24px',
            border: 0,
            padding: '20px',
            paddingTop: '10px',
            paddingBottom: '10px'
          }}
          >
            <Modal.Title>Connect Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#4D4D4D', padding: '20px', paddingTop: 0 }}>
            <div style={style.divButton}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: 0,
                borderBottom: 'solid 1px #ffffff'
              }}
                onClick={async () => {
                  await connect('keplr')
                  setShow(false)
                }}>
                <div style={style.buttonContent}>
                  <div>
                    <Image width={50}
                      src={keplrLogo}
                      preview={false} />
                  </div>
                  <div style={{ marginLeft: '25px', fontSize: '1.5rem', }}>
                    <p style={{ margin: 0, textAlign: 'left' }}>Keplr</p>
                    <p style={{ fontSize: '0.75rem', }}>
                      Keplr browser extension
                    </p>
                  </div>
                </div>
              </button>
              {/* <button style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                marginTop: '1em',
                border: 0
              }}
                onClick={async () => {
                  await connect('metamask')
                  setShow(false)
                }}>
                <div style={style.buttonContent}>
                  <div>
                    <Image width={50}
                      src={metaMaskLogo}
                      preview={false} />
                  </div>
                  <div style={{ marginLeft: '25px', fontSize: '1.5rem' }}>
                    <p style={{ margin: 0, textAlign: 'left', }}>Metamask</p>
                    <p style={{ fontSize: '0.75rem', }}>
                      Metamask browser extension
                    </p>
                  </div>
                </div>
              </button> */}
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default App;
