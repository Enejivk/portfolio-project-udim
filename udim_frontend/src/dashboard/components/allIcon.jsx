import { MdSpaceDashboard } from "react-icons/md";
import { MdPermIdentity } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { TbZoomMoneyFilled } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

const userLogin = "http://127.0.0.1:5001/static/profile_images/skywalker_3_20241015173822.jpg"
const debtors = [
    {
        profile_picture: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "John Doe",
        total_amount: 500,
        details: [
            { amount: 200, date: "2023-05-10", description: "Groceries" },
            { amount: 150, date: "2023-06-15", description: "Utilities" },
            { amount: 150, date: "2023-07-02", description: "Dinner at restaurant" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Jane Smith",
        total_amount: 800,
        details: [
            { amount: 400, date: "2023-04-20", description: "Shopping" },
            { amount: 300, date: "2023-06-01", description: "Travel expenses" },
            { amount: 100, date: "2023-07-10", description: "Movie tickets" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Alice Johnson",
        total_amount: 300,
        details: [
            { amount: 100, date: "2023-05-15", description: "Books" },
            { amount: 150, date: "2023-06-25", description: "Clothing" },
            { amount: 50, date: "2023-07-05", description: "Coffee" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Mike Brown",
        total_amount: 1200,
        details: [
            { amount: 700, date: "2023-04-18", description: "Electronics" },
            { amount: 300, date: "2023-06-10", description: "Repairs" },
            { amount: 200, date: "2023-07-15", description: "Gifts" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Emily Davis",
        total_amount: 600,
        details: [
            { amount: 200, date: "2023-05-05", description: "Dining out" },
            { amount: 300, date: "2023-06-20", description: "Medical bills" },
            { amount: 100, date: "2023-07-08", description: "Gym membership" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "David Wilson",
        total_amount: 900,
        details: [
            { amount: 400, date: "2023-04-25", description: "Car maintenance" },
            { amount: 300, date: "2023-06-05", description: "Home improvement" },
            { amount: 200, date: "2023-07-12", description: "Tickets to concert" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Sarah Clark",
        total_amount: 400,
        details: [
            { amount: 200, date: "2023-05-12", description: "Pet supplies" },
            { amount: 100, date: "2023-06-18", description: "Phone bill" },
            { amount: 100, date: "2023-07-20", description: "Hobbies" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/women/4.jpg",
        name: "Michael Lee",
        total_amount: 1500,
        details: [
            { amount: 800, date: "2023-04-30", description: "Vacation expenses" },
            { amount: 500, date: "2023-06-15", description: "Furniture" },
            { amount: 200, date: "2023-07-25", description: "Electrical appliances" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/men/5.jpg",
        name: "Sophia Martinez",
        total_amount: 700,
        details: [
            { amount: 300, date: "2023-05-08", description: "Art supplies" },
            { amount: 300, date: "2023-06-22", description: "Music concert tickets" },
            { amount: 100, date: "2023-07-18", description: "Restaurant dinner" }
        ]
    },
    {
        profile_picture: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Daniel Garcia",
        total_amount: 1000,
        details: [
            { amount: 500, date: "2023-05-20", description: "Shopping spree" },
            { amount: 300, date: "2023-06-28", description: "Fitness classes" },
            { amount: 200, date: "2023-07-30", description: "Books and magazines" }
        ]
    }
];



export {
    MdSpaceDashboard,
    MdPermIdentity,
    FaMoneyBillTrendUp,
    GrGroup,
    TbZoomMoneyFilled,
    IoMdNotifications,
    IoMdLogOut,
    GiMoneyStack,
    userLogin,
    FiAlignJustify,
    IoCloseSharp,
    debtors
}