import Navigation from "../components/navigation/Navigation";
import { ContextWrapper } from "../ContextWrapper";
import { useContext } from "react";
import { ToggleContext } from "../ContextWrapper";
import Topbar from "../components/topbar/Topbar";
import "../components/Main.css"
import FinancesTable from "../components/financeTable/FinanceTable";

const MainSection = () => {
  const { handleToggle, istoggleMenu } = useContext(ToggleContext)
  return (
    <div className={`main ${istoggleMenu ? 'active' : ''}`}>
      <Topbar />
      <FinancesTable />
    </div>
  );
};

const Finances = () => (
  <ContextWrapper>
    <div>
      <Navigation />
      <MainSection />
    </div>
  </ContextWrapper>
)

export default Finances
