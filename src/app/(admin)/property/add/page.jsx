import PropertyPhotoUpload from '@/components/PropertyPhotoUpload';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropertyAdd from './components/PropertyAdd';
import PropertyAddCard from './components/PropertyAddCard';

const PropertyAddPage = () => {
  const [preview, setPreview] = useState({});
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  return (
    <>
      <PageTitle title="Add Property" subName="" />
      <Row>
        <PropertyAddCard preview={preview} mainPhoto={uploadedPhotos[0]} mode="create" />
        <Col xl={9} lg={8}>
          <PropertyPhotoUpload
            title="Add Property Photo"
            photos={uploadedPhotos}
            onPhotosChange={setUploadedPhotos}
          />
          <PropertyAdd
            onFormValuesChange={setPreview}
            uploadedPhotos={uploadedPhotos}
          />
        </Col>
      </Row>
    </>
  );
};

export default PropertyAddPage;