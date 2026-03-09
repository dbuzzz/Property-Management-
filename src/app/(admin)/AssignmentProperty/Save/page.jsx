import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import PropertyAdd from './components/PropertyAdd';
import PropertyAddCard from './components/PropertyAddCard';

const AssignmentPropertyPage = () => {
  return (
    <>
      <PageTitle title="Assign Property" subName="" />
      <Row>
        <PropertyAddCard />
        <Col xl={9} lg={8}>
          <PropertyAdd />
        </Col>
      </Row>
    </>
  );
};

export default AssignmentPropertyPage;