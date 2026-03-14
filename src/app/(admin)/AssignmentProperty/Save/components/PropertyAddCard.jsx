import properties1 from '@/assets/images/properties/p-1.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
const PropertyAddCard = () => {
  return <Col xl={3} lg={4}>
      <Card>
        <CardBody>
          <div className="position-relative">
            <img src={properties1} alt="properties" className="img-fluid rounded bg-light" />
            <span className="position-absolute top-0 end-0 p-1">
              <span className="badge bg-success text-light fs-13">For Rent</span>
            </span>
          </div>
          <div className="mt-3">
            <h4 className="mb-1">
              Dvilla Residences Batu<span className="fs-14 text-muted ms-1">(Residences)</span>
            </h4>
            <p className="mb-1">4604 , Philli Lane Kiowa U.S.A</p>
            <h5 className="text-dark fw-medium mt-3">Price :</h5>
            <h4 className="fw-semibold mt-2 text-muted">{}OMR8,930.00</h4>
          </div>
          <Row className="mt-2 g-2">
            <Col xs={6}>
              <span className="badge bg-light-subtle text-muted border fs-12 d-inline-flex align-items-center gap-1 w-100" style={{ padding: '8px 6px' }}>
                <IconifyIcon icon="solar:bed-broken" className="fs-14 flex-shrink-0" />
                <span className="text-truncate">5 Beds</span>
              </span>
            </Col>
            <Col xs={6}>
              <span className="badge bg-light-subtle text-muted border fs-12 d-inline-flex align-items-center gap-1 w-100" style={{ padding: '8px 6px' }}>
                <IconifyIcon icon="solar:bath-broken" className="fs-14 flex-shrink-0" />
                <span className="text-truncate">4 Bath</span>
              </span>
            </Col>
            <Col xs={6}>
              <span className="badge bg-light-subtle text-muted border fs-12 d-inline-flex align-items-center gap-1 w-100" style={{ padding: '8px 6px' }}>
                <IconifyIcon icon="solar:scale-broken" className="fs-14 flex-shrink-0" />
                <span className="text-truncate">1400 ft</span>
              </span>
            </Col>
            <Col xs={6}>
              <span className="badge bg-light-subtle text-muted border fs-12 d-inline-flex align-items-center gap-1 w-100" style={{ padding: '8px 6px' }}>
                <IconifyIcon icon="solar:double-alt-arrow-up-broken" className="fs-14 flex-shrink-0" />
                <span className="text-truncate">3 Floor</span>
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
             <Button 
  variant="primary" 
  className="w-100"
  style={{ 
    backgroundColor: '#5D7186', 
    borderColor: '#5D7186',
    padding: '9px 30px'  // ✅ Button bada ho jayega
  }}
>
  Add Property
</Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>;
};
export default PropertyAddCard;