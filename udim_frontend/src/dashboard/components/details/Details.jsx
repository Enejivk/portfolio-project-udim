import { useEffect, useState } from 'react';
import './Details.css';
import { useGroup } from '../../../apiAndContext';

const RecentPayments = () => {
    const { getGroupById, selectedGroupId } = useGroup();
    const [payments, setPayments] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        let sortedPayments = []
        const group = getGroupById(selectedGroupId);
        // console.log('group in card 2:', group)
        if (group) {
            sortedPayments = group.payments
                ? group.payments.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                : [];
        }
        setMembers(group?.members);
        setPayments(sortedPayments);
    }, [selectedGroupId, getGroupById]);

    const getPayer = (userId) => {
        const payer = members.find((member) => member.id === userId);
        // console.log('payer :', payer)
        return payer ? `${payer.last_name} ${payer.first_name}` : 'Unknown';
    };

    return (
        <div className="recentPayments">
            <div className="cardHeader">
                <h2>Recently paid</h2>
                <a href="#" className="btn">View All</a>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Payment Date</td>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{getPayer(payment.user_id)}</td>
                            <td>{payment?.amount}</td>
                            <td>{new Date(payment?.updated_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RecentDebtors = () => {
    const { getGroupById, selectedGroupId } = useGroup();
    const [debtors, setDebtors] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        let sortedDebts = []
        const group = getGroupById(selectedGroupId);
        // console.log('group in card 3:', group, selectedGroupId)
        if (group) {
            sortedDebts = group.debts
                ? group.debts.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                : [];
        }
        setMembers(group?.members || []);
        setDebtors(sortedDebts);
    }, [selectedGroupId, getGroupById]);

    const getDebtor = (userId) => {
        const debtor = members.find((member) => member.id == userId);
        // console.log('debtor :', typeof(userId), userId, debtor, members);
        // console.log('debtor :', debtor);
        return {
            name: debtor ? `${debtor.last_name} ${debtor.first_name}` : '',
            imageUrl: debtor && debtor.image_url ? debtor.image_url : '',
        };
    };

    return (
        <div className="recentDebtors">
            <div className="cardHeader">
                <h2>Debtors</h2>
            </div>
            <table>
                <tbody>
                    {debtors.map((debtor) => {
                        const { name, imageUrl } = getDebtor(debtor.user_id);
                        return (
                            <tr key={debtor.id}>
                                <td width="60px">
                                    <div className="imgBx"><img src={imageUrl} alt={name} /></div>
                                </td>
                                <td>
                                    <h4>{name} <br /> <span>{debtor.amount}</span></h4>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const Details = () => {
    return (
        <div className="details">
            <RecentPayments />
            <RecentDebtors />
        </div>
    );
};

export default Details;
