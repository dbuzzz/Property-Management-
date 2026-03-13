import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AddCustomer from './components/AddCustomer';
import CustomerAddCard from './components/CustomerAddCard';

const CustomerAddPage = () => {
  const [preview, setPreview] = useState({});

  return (
    <>
      <PageTitle title="Add Leads" subName="" />
      <Row>
        <CustomerAddCard preview={preview} />
        <Col xl={9} lg={12}>
          <FileUpload title="Add Profile Photo" />
          <AddCustomer onFormValuesChange={setPreview} />
        </Col>
      </Row>
    </>
  );
};

export default CustomerAddPage;