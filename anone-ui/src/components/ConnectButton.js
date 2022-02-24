import "@fontsource/merriweather"
import { ArrowRightOutlined } from '@ant-design/icons'

const style = {
    button: {
        backgroundColor: 'transparent',
        border: 'none'
    },
    buttonText: {
        fontSize: '24px',
        color: '#27e35c',
        fontFamily: 'Roboto'
    }
}

const ConnectButton = ({ wrapSetShow }) => {

    const handleOver = (e) => {
        e.target.style.transform = 'translate(0, -5px)'
    }

    const handleLeave = (e) => {
        e.target.style.transform = 'translate(0, 0)'
    }

    return (
        <div style={style.buttonText}>
            <button 
                style={style.button}
                onClick={async () => {
                    await wrapSetShow(true)
                }}>
                Connect
                <span style={{
                    paddingBottom: '20px'
                }}>
                    <ArrowRightOutlined style={{
                        marginLeft: '10px'
                    }}/>
                </span>
            </button>
        </div>
    )
}

export default ConnectButton