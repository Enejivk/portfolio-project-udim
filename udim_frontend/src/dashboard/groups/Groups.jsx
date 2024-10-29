import Topbar from "../components/topbar/Topbar";
import Navigation from "../components/navigation/Navigation";
import { ContextWrapper } from "../ContextWrapper";
import { useContext } from "react";
import { ToggleContext } from "../ContextWrapper";
import "../components/Main.css"
import GroupsManager from "../components/group/Group";

const MainSection = () => {
    const { istoggleMenu } = useContext(ToggleContext)
    return (
        <div className={`main ${istoggleMenu ? 'active' : ''}`}>
            <Topbar />
            <GroupsManager />
        </div>
    );
};

const Profile = () => {
    return (
        <ContextWrapper>
            <div>
                <Navigation />
                <MainSection />
            </div>
        </ContextWrapper>
    )
}

export default Profile
