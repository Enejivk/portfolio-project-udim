import './CardBox.css';
import {
  MdSpaceDashboard,
  MdPermIdentity,
  FaMoneyBillTrendUp,
  GrGroup,
  TbZoomMoneyFilled,
  IoMdNotifications,
  IoMdLogOut,
  GiMoneyStack,
} from '../allIcon';
import { useGroup } from '../../../apiAndContext';
import { useEffect, useState } from 'react';

const Card = ({ amounts, cardName, IconName }) => {
  return (
    <div className="card">
      <div>
        <div className="numbers">{amounts}</div>
        <div className="cardName">{cardName}</div>
      </div>
      <div className="iconBx">
        <IconName />
      </div>
    </div>
  );
};

const CardBox = () => {
  const { getGroupById, selectedGroupId } = useGroup();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let payment = 0;
    let debt = 0;
    const group = getGroupById(selectedGroupId);
    if (group) {
        payment = group.payments
        ? group.payments.reduce((result, payment) => result + payment.amount, 0)
        : 0;

        debt = group.debts
        ? group.debts.reduce((result, debt) => result + debt.amount, 0)
        : 0;
    }
    setCards([
      { numbers: `#${payment}`, cardName: 'Contributions', IconName: GiMoneyStack },
      { numbers: group?.members?.length || 0, cardName: 'Members', IconName: GrGroup },
      { numbers: `#${debt}`, cardName: 'Debts', IconName: TbZoomMoneyFilled },
      { numbers: group?.donations?.length || 0, cardName: 'Created Donations', IconName: FaMoneyBillTrendUp },
    ]);
  }, [selectedGroupId]);

  return (
    <div className="cardBox">
      {cards.map((card, index) => (
        <Card key={index} amounts={card.numbers} cardName={card.cardName} IconName={card.IconName} />
      ))}
    </div>
  );
};

export default CardBox;
