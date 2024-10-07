import './CardBox.css'

import  {
    MdSpaceDashboard,
    MdPermIdentity,
    FaMoneyBillTrendUp,
    GrGroup,
    TbZoomMoneyFilled,
    IoMdNotifications,
    IoMdLogOut,
    GiMoneyStack,
} from '../allIcon'

const Card = ({ numbers, cardName, IconName }) => {
    return (
        <div className="card">
            <div>
                <div className="numbers">{numbers}</div>
                <div className="cardName">{cardName}</div>
            </div>
            <div className="iconBx">
                <IconName />
            </div>
        </div>
    );
};

const CardBox = () => {
    const cards = [
        { numbers: '$6,504', cardName: 'Savings', IconName: GiMoneyStack },
        { numbers: '80', cardName: 'Members', IconName: GrGroup },
        { numbers: '28', cardName: 'Debtors', IconName: TbZoomMoneyFilled },
        { numbers: '$7,84', cardName: 'Profit', IconName: FaMoneyBillTrendUp },
    ];

    return (
        <div className="cardBox">
            {cards.map((card, index) => (
                <Card key={index} numbers={card.numbers} cardName={card.cardName} IconName={card.IconName} />
            ))}
        </div>
    );
};

export default CardBox;
