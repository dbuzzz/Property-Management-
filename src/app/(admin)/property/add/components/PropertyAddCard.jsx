import properties1 from '@/assets/images/properties/p-1.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';

const PropertyAddCard = ({ preview = {}, mode = 'create' }) => {
  const name = preview.building_name || preview.name || '—';
  const address = preview.address || '—';
  const price = preview.price || '0';
  const beds = preview.beds || '—';
  const baths = preview.baths || '—';
  const area = preview.area || '—';
  const floor = preview.floor || '—';
  const statusBadge = preview.status || 'For Rent';

  return (
    <Col xl={3} lg={4}>
      <Card>
        <CardBody>
          <div className="position-relative">
            <img src={properties1} alt="properties" className="img-fluid rounded bg-light" />
            <span className="position-absolute top-0 end-0 p-1">
              <span className="badge bg-success text-light fs-13">{statusBadge}</span>
            </span>
          </div>
          <div className="mt-3">
            <h4 className="mb-1">{name}</h4>
            <p className="mb-1">{address}</p>
            <h5 className="text-dark fw-medium mt-3">Price :</h5>
            <h4 className="fw-semibold mt-2 text-muted">₹{price}</h4>
          </div>
          <Row className="mt-2 g-2">
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:bed-broken" className="align-middle" />
                </span>
                &nbsp;{beds} Beds
              </span>
            </Col>
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:bath-broken" className="align-middle" />
                </span>
                &nbsp;{baths} Bath
              </span>
            </Col>
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:scale-broken" className="align-middle" />
                </span>
                &nbsp;{area}ft
              </span>
            </Col>
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon
                    icon="solar:double-alt-arrow-up-broken"
                    className="align-middle"
                  />
                </span>
                &nbsp;{floor} Floor
              </span>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="bg-light-subtle">
          <Row className="g-2">
            <Col lg={6}>
              <Button variant="outline-primary" className="w-100">
                Cancel
              </Button>
            </Col>
            <Col lg={6}>
              <Button variant="primary" className="w-100">
                {mode === 'update' ? 'Update Property' : 'Add Property'}
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default PropertyAddCard;

