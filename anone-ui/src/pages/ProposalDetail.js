import { useState, useEffect, useCallback } from "react";
import {
    useParams
} from "react-router-dom";
import { getProposal, getProposer, getTally } from "../helpers/getProposal";
import '../assets/css/ProposalDetail.css'
import VoterList from "../components/VoterList";
import { Modal } from "react-bootstrap";
import VoteModal from "../components/VoteModal";

const style = {
    card: {
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '2em',
        borderRadius: '20px',
        minHeight: '100%',
        fontFamily: 'Lato',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '2em'
    },
    title: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '1.3rem',
    },
    content: {
        textAlign: 'left',
    },
    voters: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '10px',
        marginBottom: '20px',
        color: '#bdbdbd',
        fontFamily: 'Ubuntu',
        marginTop: '5rem',
        padding: 20
    },
}

const ProposalDetail = () => {
    const [proposal, setProposal] = useState([])
    const [proposer, setProposer] = useState({
        proposal_id: -1,
        proposer: ''
    })
    let { id } = useParams();
    const [show, setShow] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await getProposal(id)
            const proposalById = res.result
            const proposer = await getProposer(id)
            if (proposalById.status === 1 || proposalById.status === 2) {
                const tally = await getTally(proposalById.id)
                proposalById.tally = tally.result
            }
            setProposer({ ...proposer.result })
            setProposal([proposalById])
        })()
    }, [id])

    const handleClose = () => {
        setShow(false)
    }

    const wrapSetShow = useCallback((val) => {
        setShow(val)
    }, [setShow])

    console.log(proposal[0])

    const getStatus = () => {
        if (proposal[0].status === 3) {
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
        else if (proposal[0].status === 4) {
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
        else if (proposal[0].status === 1) {
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
    return (
        <div style={{
            padding: 50,
            paddingTop: 20
        }}>
            <div style={{
                fontSize: '3rem',
                color: '#EFCF20',
                fontFamily: 'Ubuntu',
                fontWeight: 600,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                marginBottom: '0.5em'
            }}>
                Proposal Details
            </div>
            <div style={style.card}>
                <div style={style.title}>
                    <p className='title' style={style.title}>
                        #{proposal.length > 0 && proposal[0].id}
                        {proposal.length > 0 && getStatus()}
                        {proposal.length > 0 && proposal[0].content.value.title}
                    </p>
                </div>
                <div style={style.content}>
                    <div className="line" style={{ backgroundColor: '#cccccc' }}>
                        <p className="left">
                            Proposal ID
                        </p>
                        <p className="right">
                            {proposal.length > 0 && proposal[0].id || 0}
                        </p>
                    </div>
                    <div className="line">
                        <p className="left">
                            Proposer
                        </p>
                        <p className="right">
                            {proposer.proposer}
                        </p>
                    </div>
                    <div className="line" style={{ backgroundColor: '#cccccc' }}>
                        <p className="left">
                            Total Deposit
                        </p>
                        <p className="right">
                            {proposal.length > 0 &&
                                proposal[0].total_deposit.length > 0 &&
                                parseInt(proposal[0].total_deposit[0].amount) / 1000000}
                        </p>
                    </div>
                    <div className="line">
                        <p className="left">
                            Submited Time
                        </p>
                        <p className="right">
                            {proposal.length > 0 &&
                                `${proposal[0].submit_time.split('T')[0]} ${proposal[0].submit_time.split('T')[1]}`}
                        </p>
                    </div>
                    <div className="line" style={{ backgroundColor: '#cccccc' }}>
                        <p className="left">
                            Voting Time
                        </p>
                        <p className="right">
                            {proposal.length > 0 &&
                                `${proposal[0].voting_start_time.split('T')[0]} ${proposal[0].voting_start_time.split('T')[1]}-${proposal[0].voting_end_time.split('T')[0]} ${proposal[0].voting_end_time.split('T')[1]}`}
                        </p>
                    </div>
                    <div className="line">
                        <p className="left">
                            Proposal Type
                        </p>
                        <p className="right">
                            {proposal.length > 0 && proposal[0].content.type}
                        </p>
                    </div>
                    <div className="line" style={{ backgroundColor: '#cccccc' }}>
                        <p className="left">
                            Title
                        </p>
                        <p className="right">
                            {proposal.length > 0 && proposal[0].content.value.title}
                        </p>
                    </div>
                    <div className="line">
                        <p className="left">
                            Description
                        </p>
                        <p className="right">
                            {proposal.length > 0 && proposal[0].content.value.description}
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ ...style.voters, marginTop: '0', paddingTop: '2em' }} >
                {proposal.length > 0 && <VoterList proposal={proposal[0]} />}
            </div>
            <>
                <Modal show={show} onHide={handleClose} backdrop="static" >
                    <Modal.Header style={{ backgroundColor: '#d6d6d6', color: '#696969', fontFamily: 'ubuntu', fontSize: '1.2rem', fontWeight: 600 }}>
                        <div>
                            Vote
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#1f1f1f', }}>
                        {proposal.length > 0 && <VoteModal proposal={proposal[0]} wrapSetShow={wrapSetShow} />}
                    </Modal.Body>
                </Modal>
            </>
        </div>
    )
}

export default ProposalDetail