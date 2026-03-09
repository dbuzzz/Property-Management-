import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import OwnerDetails from './components/OwnerDetails';
import PropertyDetails from './components/PropertyDetails';
const PropertyDetailsPage = () => {
  return <>
  <div style={{
        fontSize: '1.2rem',
        fontWeight: 550,
        color: 'black',
        marginBottom: '1rem',
        paddingLeft: ''
      }}>
        Properties / Oman / Muskat / PRP-10234
      </div>
    
      <Row>
        <OwnerDetails />
        <PropertyDetails />
      </Row>
     
    </>;
};
export default PropertyDetailsPage;