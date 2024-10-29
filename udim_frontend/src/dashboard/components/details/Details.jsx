import './Details.css'

const RecentOrders = () => {
    const orders = [
        { name: 'Mathew james', price: '$1200', payment: 'Paid', status: 'Delivered' },
        { name: 'Fath Mary', price: '$110', payment: 'Due', status: 'Pending' },
        { name: 'Mary Peters', price: '$1200', payment: 'Paid', status: 'Return' },
        { name: 'Joseph Peters', price: '$620', payment: 'Due', status: 'In Progress' },
        { name: 'Peters Joseph', price: '$1200', payment: 'Paid', status: 'Delivered' },
        { name: 'Gabriel James', price: '$110', payment: 'Due', status: 'Pending' },
        { name: 'James Faith', price: '$1200', payment: 'Paid', status: 'Return' },
        { name: 'Peters Faith', price: '$620', payment: 'Due', status: 'In Progress' },
    ];

    return (
        <div className="recentOrders">
            <div className="cardHeader">
                <h2>Recently paid</h2>
                <a href="#" className="btn">View All</a>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Payment</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.name}>
                            <td>{order.name}</td>
                            <td>{order.price}</td>
                            <td>{order.payment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Images = [
    'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600',




]
const RecentCustomers = () => {
    const customers = [
        { img: Images[1], name: 'David', location: 'Italy' },
        { img: Images[2], name: 'Amit', location: 'India' },
        { img: Images[3], name: 'Amit', location: 'India' },
        { img: Images[4], name: 'Amit', location: 'India' },
        { img: Images[5], name: 'Amit', location: 'India' },
        { img: Images[6], name: 'Amit', location: 'India' },
        { img: Images[7], name: 'Amit', location: 'India' },
        { img: Images[8], name: 'Amit', location: 'India' },
        { img: Image[0], name: 'Amit', location: 'India' },
    ];

    return (
        <div className="recentCustomers">
            <div className="cardHeader">
                <h2>Debtors</h2>
            </div>
            <table>
                {customers.map((customer, index) => (
                    <tr key={index}>
                        <td width="60px">
                            <div className="imgBx"><img src={customer.img} alt="" /></div>
                        </td>
                        <td>
                            <h4>{customer.name} <br /> <span>{customer.location}</span></h4>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};


const Details = () => {
    return (
        <div className="details">
            <RecentOrders />
            <RecentCustomers />
        </div>
    );
};

export default Details;
