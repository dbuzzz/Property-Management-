import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropertyAdd from './components/PropertyAdd';
import PropertyAddCard from './components/PropertyAddCard';

const PropertyAddPage = () => {
  const [preview, setPreview] = useState({});

  return (
    <>
      <PageTitle title="Add Property" subName="" />
      <Row>
        <PropertyAddCard preview={preview} mode="create" />
        <Col xl={9} lg={8}>
          <FileUpload title="Add Property Photo" />
          <PropertyAdd onFormValuesChange={setPreview} />
        </Col>
      </Row>
    </>
  );
};

export default PropertyAddPage;