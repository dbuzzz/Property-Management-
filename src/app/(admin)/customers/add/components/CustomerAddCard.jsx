import avatar2 from '@/assets/images/users/avatar-2.jpg';
import { Card, CardBody, Col, Row } from 'react-bootstrap';

const CustomerAddCard = ({ preview = {} }) => {
  const firstName = preview.first_name ?? '';
  const lastName = preview.last_name ?? '';
  const name = [firstName, lastName].filter(Boolean).join(' ') || '—';
  const contact = preview.phone ?? '';
  const address = preview.description ?? '';
  const leadType = preview.leadType ?? '';
  const status = preview.status ?? 'Available';

  return (
    <Col xl={3} lg={12}>
      <Card className="overflow-hidden">
        <CardBody>
          <div className="customer-bg text-center rounded position-relative">
            <img
              src={avatar2}
              alt="avatar"
              className="avatar-xl border border-light border-3 rounded-circle position-absolute top-100 start-0 translate-middle ms-5"
            />
          </div>
          <div className="mt-5 pt-3 ms-1">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0 text-dark fw-semibold">{name}</h4>
              <div>
                <span className="badge bg-success text-white fs-12 px-2 py-1">
                  {status || 'Available'}
                </span>
              </div>
            </div>
            <p className="text-muted fw-medium fs-14 mb-1">
              <span className="text-dark me-1">Email Address : </span>
              {preview.email || '—'}
            </p>
            <p className="text-muted fw-medium fs-14 mb-1">
              <span className="text-dark me-1">Contact Number : </span>
              {contact || '—'}
            </p>
            <p className="text-muted fw-medium fs-14 mb-1">
              <span className="text-dark me-1">Address : </span>
              {address || '—'}
            </p>
            <Row className="mt-3 justify-content-between">
              <Col lg={4}>
                <p className="fw-medium mb-2">Lead Id</p>
                <h5 className="mb-0 fw-semibold text-dark">{preview.leadId || '—'}</h5>
              </Col>
              <Col lg={4}>
                <p className="fw-medium mb-2">Lead type</p>
                <h5 className="mb-0 fw-semibold text-dark">{leadType || '—'}</h5>
              </Col>
              <Col lg={4}>
                <p className="fw-medium mb-2">Created at</p>
                <h5 className="mb-0 fw-semibold text-dark">{preview.createdAt || '—'}</h5>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomerAddCard;
