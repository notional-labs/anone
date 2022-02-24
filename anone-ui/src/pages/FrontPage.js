import { Image } from "antd"
import digger from '../assets/img/digger.png'
import coin1 from '../assets/img/coin1.png'
import coin2 from '../assets/img/coin2.png'
import coin3 from '../assets/img/coin3.png'

const style = {
    intro: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 140,
        paddingTop: 20,
        paddingBottom: 20,
        height: 'auto',
        minHeight: '70vh'
    },
    asset: {
        position: 'absolute',
        zIndex: 1
    },
}

const FrontPage = () => {
    return (
        <div style={{
            paddingTop: 10
        }}>
            <div style={style.intro}>
                <div style={{
                    textAlign: 'left',
                    width: '40%'
                }}>
                    <p style={{
                        color: '#27e35c',
                        fontSize: '100px',
                        fontWeight: 700,
                        margin: 0,
                        height: '100px'
                    }}>
                        ANONE
                    </p>
                    <p style={{
                        color: '#FFFFFF',
                        fontSize: '100px',
                        fontWeight: 700,
                        margin: 0
                    }}>
                        your coin
                    </p>
                    <p style={{
                        color: '#FFFFFF',
                        fontSize: '24px',
                        fontWeight: 10,
                        margin: 0
                    }}>
                        Welcome to the Anone chain website.
                    </p>
                    <p style={{
                        color: '#FFFFFF',
                        fontSize: '24px',
                        fontWeight: 10,
                        margin: 0
                    }}>
                        Let have a kick around the comunity and the validators.
                    </p>
                    
                    <a href="https://digchain.org/" target={'_blank'}>
                        <button style={{
                            border: 0,
                            borderRadius: '10px',
                            backgroundColor: '#27e35c',
                            color: '#ffffff',
                            fontSize: '24px',
                            padding: 30,
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginTop: '20px'
                        }}>
                            White paper
                        </button>
                    </a>
                </div>
                {/* <div>
                    <Image
                        width={500}
                        src={digger}
                        preview={false}
                    />
                </div> */}
            </div>
            {/* <div style={{
                ...style.asset,
                top: '200px',
                left: '800px',
                transform: 'rotate(120deg)'
            }}>
                <Image
                    width={150}
                    src={coin1}
                    preview={false}
                />
            </div>
            <div style={{
                ...style.asset,
                top: '700px',
                left: '500px',
                transform: 'rotate(120deg)'
            }}>
                <Image
                    width={80}
                    src={coin1}
                    preview={false}
                />
            </div>
            <div style={{
                ...style.asset,
                top: '750px',
                left: '600px',
            }}>
                <Image
                    width={150}
                    src={coin1}
                    preview={false}
                />
            </div>
            <div style={{
                ...style.asset,
                top: '600px',
                left: '1000px',
            }}>
                <Image
                    width={300}
                    src={coin2}
                    preview={false}
                />
            </div>
            <div style={{
                ...style.asset,
                top: '620px',
                left: '1600px',
            }}>
                <Image
                    width={150}
                    src={coin3}
                    preview={false}
                />
            </div> */}

        </div >
    )
}

export default FrontPage