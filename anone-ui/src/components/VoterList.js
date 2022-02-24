import { useEffect, useState } from "react"
import { getVotes } from "../helpers/getProposal"
import { Typography, Tooltip } from 'antd';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const style = {
    voteBarContainer: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '10%',
        marginBottom: '1em',
        color: '#ffffff',
        padding: '2em'
    },
    voteBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        width: '100%',
        borderRadius: '50px',
        backgroundColor: '#cccccc',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 0,
        paddingBottom: 20
    },
    table: {
        width: '100%',
    },
    tdlHeader: {
        backgroundColor: '#ffa538',
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
        color: '#ffffff',
        textTransform: 'uppercase',
        fontFamily: 'Ubuntu',
    },
    td: {
        padding: '15px',
        textAlign: 'left',
        verticalAlign: 'middle',
        fontWeight: '600',
        fontSize: '17px',
        color: '#696969',
        fontFamily: 'Ubuntu',
        width: '20%'
    }
}

const VoterList = ({ proposal }) => {
    const [loading, setLoading] = useState(false)
    const [voters, setVoters] = useState([])

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await getVotes(proposal.id)
            const voters = res.votes
            setVoters([...voters])
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

    const getOption = (option) => {
        if (option === 'VOTE_OPTION_NO') return 'No'
        if (option === 'VOTE_OPTION_YES') return 'Yes'
        if (option === 'VOTE_OPTION_NO_WITH_VETO') return 'No With Veto'
        else return 'Abstain'
    }

    return (
        <div>
            <div style={style.container}>
                <Title style={{ color: '#000000', fontSize: '2rem', fontWeight: 500, fontFamily: 'Ubuntu' }}>
                    Voters
                </Title>
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
                        backgroundColor: '#28c76f',
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
            {!loading && proposal.status < 3 && (
                <div style={{ backgroundColor: 'rgb(255, 255, 255, 1)', borderRadius: '20px', padding: '2em' }}>
                    <table cellPadding="0" cellSpacing="0" border="0" style={style.table}>
                        <thead style={style.tdlHeader}>
                            <tr>
                                <th style={{ ...style.th, width: '20%' }}>Voter</th>
                                <th style={{ ...style.th, width: '10rem'}}>Option</th>
                            </tr>
                        </thead>
                        <tbody style={style.tdlContent}>
                            {voters.map((vote, index) => {
                                return (
                                    <tr key={index} style={{ backgroundColor: index % 2 !== 0 && '#ffe1bd', borderBottom: 'solid 1px #7d7d7d' }}>
                                        <td style={style.td}>
                                            <Link to={`../accounts/${vote.voter}`}>
                                                {vote.voter}
                                            </Link>
                                        </td>
                                        <td style={style.td}>
                                            {vote.option && getOption(vote.option)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default VoterList