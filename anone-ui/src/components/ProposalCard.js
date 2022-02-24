import { FaArrowRight } from "react-icons/fa";
import '../assets/css/ProposalCard.css'
import {
    Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getTally } from "../helpers/getProposal"


const style = {
    card: {
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '2em',
        borderRadius: '20px',
        minHeight: '100%',
        fontFamily: 'Lato',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    timeBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '1.5em'
    },
    timeBoxContainer: {
        padding: '0 auto',
        marginTop: '1.5em',
    },
    title: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '1.3rem',
    },
    description: {
        textAlign: 'left',
        color: '#6b6b6b',
        fontWeight: 800,
        fontSize: '1rem',
    },
    timeCard: {
        backgroundColor: '#fabf5a',
        padding: '1em',
        borderRadius: '20px'
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detail: {
        padding: '1em',
        borderRadius: '50px',
        fontWeight: 'bold',
        width: '100%'
    },
    extraButton: {
        padding: '1em',
        borderRadius: '50px',
        fontWeight: 'bold',
        width: '30%',
        backgroundColor: '#ff9f40'
    },
    time: {
        fontWeight: 'bold',
        color: '#0085ff'
    },
    voteBarContainer: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '10%'
    },
    voteBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        width: '100%',
        borderRadius: '50px',
        backgroundColor: '#cccccc',
    }
}

const ProposalCard = ({ proposal, wrapSetShow, wrapSetSelect, index }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' || proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD') {
                const tally = await getTally(proposal.proposal_id)
                proposal.tally = tally.result
            }
            setLoading(false)
        })()
    }, [])

    const getPercentage = (vote) => {
        if (proposal.tally !== undefined) {
            const sum = parseInt(proposal.tally.yes)
                + parseInt(proposal.tally.no_with_veto)
                + parseInt(proposal.tally.no)
                + parseInt(proposal.tally.abstain)

            return sum !== 0 && parseFloat(parseInt(vote) * 100 / sum).toFixed(1) || 0
        }
        else {
            const sum = parseInt(proposal.final_tally_result.yes)
                + parseInt(proposal.final_tally_result.no_with_veto)
                + parseInt(proposal.final_tally_result.no)
                + parseInt(proposal.final_tally_result.abstain)

            return sum !== 0 && parseFloat(parseInt(vote) * 100 / sum).toFixed(1) || 0
        }
    }

    const getStatus = () => {
        if (proposal.status === 'PROPOSAL_STATUS_PASSED') {
            return (
                <span style={{
                    color: '#28c76f',
                    backgroundColor: 'rgba(40,199,111,.12)',
                    fontWeight: 'bold',
                    padding: '0.5em',
                    borderRadius: '100px',
                    marginRight: '0.5em',
                    marginLeft: '0.5em'
                }}>
                    Passed
                </span>)
        }
        else if (proposal.status === 'PROPOSAL_STATUS_REJECTED') {
            return (
                <span style={{
                    color: '#ea5455',
                    backgroundColor: 'rgba(234,84,85,.12)',
                    fontWeight: 'bold',
                    padding: '0.5em',
                    borderRadius: '100px',
                    marginRight: '0.5em',
                    marginLeft: '0.5em'
                }}>
                    Rejected
                </span>
            )
        }
        else if (proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD') {
            return (
                <span style={{
                    color: '#00cfe8',
                    backgroundColor: 'rgba(0,207,232,.12)',
                    fontWeight: 'bold',
                    padding: '0.5em',
                    borderRadius: '100px',
                    marginRight: '0.5em',
                    marginLeft: '0.5em'
                }}>
                    Deposit
                </span>
            )
        }
        else {
            return (
                <span style={{
                    color: '#7367f0',
                    backgroundColor: 'rgba(115,103,240,.12)',
                    fontWeight: 'bold',
                    padding: '0.5em',
                    borderRadius: '100px',
                    marginRight: '0.5em',
                    marginLeft: '0.5em'
                }}>
                    Voting
                </span>
            )
        }
    }

    const handleClick = () => {
        wrapSetShow(true)
        wrapSetSelect(index)
    }

    return (
        !loading && (
            <div style={style.card}>
                <div>
                    <p className='title' style={style.title}>
                        #{proposal.proposal_id}
                        {getStatus()}
                        {proposal.content.title}
                    </p>
                    <div className="description" style={style.description}>
                        {proposal.content.description}
                    </div>
                </div>
                <div style={style.timeBoxContainer}>
                    <div style={style.timeBox}>
                        <div style={style.timeCard}>
                            <div>
                                Submit Date
                            </div>
                            <div style={style.time}>
                                {proposal.submit_time.split('T')[0]}
                            </div>
                        </div>
                        <div style={style.timeCard}>
                            <div>
                                Start Date
                            </div>
                            <div style={style.time}>
                                {proposal.voting_start_time.split('T')[0]}
                            </div>
                        </div>
                        <div style={style.timeCard}>
                            <div>
                                End Date
                            </div>
                            <div style={style.time}>
                                {proposal.voting_end_time.split('T')[0]}
                            </div>
                        </div>
                    </div>
                    <div style={style.voteBarContainer}>
                        <div style={style.voteBar}>
                            <div style={{
                                width: `${proposal.tally !== undefined
                                    ? getPercentage(proposal.tally.yes) :
                                    getPercentage(proposal.final_tally_result.yes)
                                    }%`,
                                backgroundColor: '#28c76f',
                                minHeight: '100%',
                            }}>
                                {proposal.tally !== undefined ? getPercentage(proposal.tally.yes) != 0.0
                                    && `${getPercentage(proposal.tally.yes)}%` :
                                    getPercentage(proposal.final_tally_result.yes) != 0.0
                                    && `${getPercentage(proposal.final_tally_result.yes)}%`}
                            </div>
                            <div style={{
                                width: `${proposal.tally !== undefined
                                    ? getPercentage(proposal.tally.no) :
                                    getPercentage(proposal.final_tally_result.no)
                                    }%`,
                                backgroundColor: '#ea5455',
                                minHeight: '100%'
                            }}>
                                {proposal.tally !== undefined ? getPercentage(proposal.tally.no) != 0.0
                                    && `${getPercentage(proposal.tally.no)}%` :
                                    getPercentage(proposal.final_tally_result.no) != 0.0
                                    && `${getPercentage(proposal.final_tally_result.no)}%`}
                            </div>
                            <div style={{
                                width: `${proposal.tally !== undefined
                                    ? getPercentage(proposal.tally.abstain) :
                                    getPercentage(proposal.final_tally_result.abstain)
                                    }%`,
                                backgroundColor: '#cccccc',
                                minHeight: '100%',

                            }}>
                                {proposal.tally !== undefined ? getPercentage(proposal.tally.abstain) != 0.0
                                    && `${getPercentage(proposal.tally.abstain)}%` :
                                    getPercentage(proposal.final_tally_result.abstain) != 0.0
                                    && `${getPercentage(proposal.final_tally_result.abstain)}%`}
                            </div>
                            <div style={{
                                width: `${proposal.tally !== undefined
                                    ? getPercentage(proposal.tally.no_with_veto) :
                                    getPercentage(proposal.final_tally_result.no_with_veto)
                                    }%`,
                                backgroundColor: '#ff9f43',
                                minHeight: '100%',
                            }}>
                                {proposal.tally !== undefined ? getPercentage(proposal.tally.no_with_veto) != 0.0
                                    && `${getPercentage(proposal.tally.no_with_veto)}%` :
                                    getPercentage(proposal.final_tally_result.no_with_veto) != 0.0
                                    && `${getPercentage(proposal.final_tally_result.no_with_veto)}%`}
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr />
                        <div style={style.buttonBox}>
                            <Link style={{ width: '30%' }} to={`${proposal.proposal_id}`}>
                                <button style={style.detail}>
                                    Detail
                                </button>
                            </Link>
                            {
                                proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' && (
                                    <button style={style.extraButton} onClick={handleClick}>
                                        Vote
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>


            </div >
        )
    )
}

export default ProposalCard