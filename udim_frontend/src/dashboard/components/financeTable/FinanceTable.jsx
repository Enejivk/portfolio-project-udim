import React from 'react';
import './FinanceTable.css';

const finances = [
    {
        member_name: "John Doe",
        profile_picture: "https://randomuser.me/api/portraits/men/1.jpg",
        amount: [
            { paid_amount: 100, date_paid: "2024-01-15" },
            { paid_amount: 50, date_paid: "2024-02-20" },
            { paid_amount: 200, date_paid: "2024-03-10" },
        ]
    },
    {
        member_name: "Jane Smith",
        profile_picture: "https://randomuser.me/api/portraits/women/1.jpg",
        amount: [
            { paid_amount: 125, date_paid: "2024-02-22" },
            { paid_amount: 175, date_paid: "2024-03-12" },
            { paid_amount: 225, date_paid: "2024-04-08" },
        ]
    },
    {
        member_name: "Alice Johnson",
        profile_picture: "https://randomuser.me/api/portraits/women/2.jpg",
        amount: [
            { paid_amount: 110, date_paid: "2024-02-24" },
            { paid_amount: 160, date_paid: "2024-03-14" },
            { paid_amount: 210, date_paid: "2024-04-10" }
        ]
    },
    {
        member_name: "Bob Brown",
        profile_picture: "https://randomuser.me/api/portraits/men/2.jpg",
        amount: [
            { paid_amount: 90, date_paid: "2024-01-25" },
            { paid_amount: 140, date_paid: "2024-02-26" },
            { paid_amount: 190, date_paid: "2024-03-16" },
        ]
    },
    {
        member_name: "Charlie Green",
        profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
        amount: [
            { paid_amount: 130, date_paid: "2024-02-28" },
            { paid_amount: 180, date_paid: "2024-03-18" },
            { paid_amount: 230, date_paid: "2024-04-15" },
        ]
    },
    {
        member_name: "Diana White",
        profile_picture: "https://randomuser.me/api/portraits/women/3.jpg",
        amount: [
            { paid_amount: 95, date_paid: "2024-01-30" },
            { paid_amount: 145, date_paid: "2024-03-01" },
            { paid_amount: 195, date_paid: "2024-03-20" },
        ]
    },
    {
        member_name: "Edward Black",
        profile_picture: "https://randomuser.me/api/portraits/men/4.jpg",
        amount: [
            { paid_amount: "$85", date_paid: "2024-02-02" },
            { paid_amount: 135, date_paid: "2024-03-05" },
            { paid_amount: 185, date_paid: "2024-03-22" },
        ]
    },
    {
        member_name: "Fiona Blue",
        profile_picture: "https://randomuser.me/api/portraits/women/4.jpg",
        amount: [
            { paid_amount: 105, date_paid: "2024-02-05" },
            { paid_amount: 155, date_paid: "2024-03-08" },
            { paid_amount: 205, date_paid: "2024-03-24" },
        ]
    },
    {
        member_name: "George Silver",
        profile_picture: "https://randomuser.me/api/portraits/men/5.jpg",
        amount: [
            { paid_amount: 115, date_paid: "2024-02-08" },
            { paid_amount: 165, date_paid: "2024-03-10" },
            { paid_amount: 215, date_paid: "2024-03-26" },
        ]
    },
    {
        member_name: "Hannah Gold",
        profile_picture: "https://randomuser.me/api/portraits/women/5.jpg",
        amount: [
            { paid_amount: 125, date_paid: "2024-02-10" },
            { paid_amount: 175, date_paid: "2024-03-12" },
            { paid_amount: 225, date_paid: "2024-03-28" }
        ]
    }
];

const FinancesTable = () => {
    return (
        <table className='finance'>
            <thead>
                <tr>
                    <th>Member</th>
                    <th colSpan="6">Amount Paid</th>
                </tr>
            </thead>
            <tbody>
                {finances.map((member, index) => (
                    <tr key={index}>
                        <td className='tableNameImage'>
                            <img src={member.profile_picture} alt={member.member_name} />

                            {member.member_name}
                        </td>
                        {member.amount.map((payment, idx) => (
                            <td key={idx}>
                                {"$" + payment.paid_amount}<br />
                                {payment.date_paid}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FinancesTable;
