import Navigation from '../components/navigation/Navigation';
import Main from '../components/Main';
import { ContextWrapper } from '../ContextWrapper';
import './Overview.css';
import CardBox from '../components/cardBox/CardBox';
import Details from '../components/details/Details';


function Overview() {
    return (
        <ContextWrapper>
            <div className="container">
                <Navigation />
                <Main>
                    <CardBox />
                    <Details />
                </Main>
            </div>
        </ContextWrapper>
    );
}

export default Overview ;
