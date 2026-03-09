import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import AddCustomer from './components/AddCustomer';
import CustomerAddCard from './components/CustomerAddCard';
const CustomerAddPage = () => {
  return <>
      <PageTitle title="Add Leads" subName="" />
      <Row>
        <CustomerAddCard />
        <Col xl={9} lg={12}>
          <FileUpload title="Add Profile Photo" />
          <AddCustomer />
        </Col>
      </Row>
    </>;
};
export default CustomerAddPage;