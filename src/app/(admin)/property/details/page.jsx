import { API_BASE_URL, AUTH_TOKEN } from '@/constants/api';
import httpClient from '@/helpers/httpClient';
import { useEffect, useMemo, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useLocation, useSearchParams } from 'react-router-dom';
import OwnerDetails from './components/OwnerDetails';
import PropertyDetails from './components/PropertyDetails';

const PropertyDetailsPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initialProperty = location.state?.property ?? null;
  const initialId = useMemo(() => {
    const fromState = location.state?.propertyId ?? initialProperty?.propertyId;
    const fromQuery = searchParams.get('property_id');
    return fromState || (fromQuery ? Number(fromQuery) : undefined);
  }, [location.state, initialProperty, searchParams]);

  const [property, setProperty] = useState(initialProperty);
  const [loading, setLoading] = useState(!initialProperty && !!initialId);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!initialId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await httpClient.get(
          `${API_BASE_URL}/property/get/?property_id=${initialId}`,
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
              Accept: 'application/json',
            },
          }
        );
        setProperty(res.data?.data ?? null);
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    if (!initialProperty) {
      fetchProperty();
    }
  }, [initialId, initialProperty]);

  const pd = property?.propertyDetails ?? {};
  const breadcrumbCity = pd.city || 'Oman';
  const breadcrumbState = pd.state || 'Muskat';
  const breadcrumbCode = pd.property_code || pd.propertyCode || 'PRP-10234';

  return (
    <>
      <div
        style={{
          fontSize: '1.2rem',
          fontWeight: 550,
          color: 'black',
          marginBottom: '1rem',
          paddingLeft: '',
        }}
      >
        Properties / {breadcrumbCity} / {breadcrumbState} / {breadcrumbCode}
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="text-danger py-3">{error}</div>
      ) : (
        <Row>
          <Col xl={9} lg={8}>
            <PropertyDetails property={property} />
          </Col>
          <OwnerDetails property={property} />
        </Row>
      )}
    </>
  );
};

export default PropertyDetailsPage;