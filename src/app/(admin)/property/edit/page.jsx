import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import PropertyAdd from '@/app/(admin)/property/add/components/PropertyAdd';
import PropertyAddCard from '@/app/(admin)/property/add/components/PropertyAddCard';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

const PropertyEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  const initialPreview = useMemo(() => {
    if (!property) return {};
    const pd = property.propertyDetails ?? {};
    const fd = property.flatData ?? {};
    const buildingName = property.buildingDetails || pd.building_name || '';
    const address = pd.address_line_1 || '';
    const city = pd.city || '';
    const country = pd.country || '';
    const fullAddress = [address, city, country].filter(Boolean).join(', ');
    const price = pd.monthly_rent || property.expectedRent || '';
    const beds = (fd.flat_configuration || '').replace(/[^0-9]/g, '') || '';
    const baths = fd.no_of_bathrooms || '';
    const area = pd.carpet_area_sqft || property.dimensionAreaSqft || '';
    const floor = property.floor || fd.floor_number || '';
    const status = property.isActive ? 'Active' : 'Inactive';
    return {
      building_name: buildingName,
      name: buildingName,
      address: fullAddress,
      price,
      beds,
      baths,
      area,
      floor,
      status,
    };
  }, [property]);

  const [preview, setPreview] = useState(initialPreview);

  if (!property) {
    return (
      <>
        <PageTitle title="Update Property" subName="Property not found" />
        <Card>
          <CardBody className="text-center py-5">
            <p className="text-muted mb-3">No property data available. Go back to the list and open a property from Edit.</p>
            <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>Back to List</button>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Update Property" subName="" />
      <Row>
        <PropertyAddCard preview={preview} mode="update" />
        <Col xl={9} lg={8}>
          <FileUpload title="Property Photo" />
          <PropertyAdd initialData={property} mode="update" onFormValuesChange={setPreview} />
        </Col>
      </Row>
    </>
  );
};

export default PropertyEditPage;
