import Topbar from "../components/topbar/Topbar";
import Navigation from "../components/navigation/Navigation";
import { useContext } from "react";
import { ToggleContext, ContextWrapper } from "../ContextWrapper";
import "../components/Main.css"
import ProfileDetails from '../components/profileDetails/ProfileDetails'

const MainSection = () => {
    const { istoggleMenu } = useContext(ToggleContext)
    return (
        <div className={`main ${istoggleMenu ? 'active' : ''}`}>
            <Topbar />
            <ProfileDetails />
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
