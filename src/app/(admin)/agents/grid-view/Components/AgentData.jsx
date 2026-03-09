import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllAgent } from '@/helpers/data';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { useFetchData } from '@/hooks/useFetchData';

const AgentCard = ({
  address,
  properties,
  user
}) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex flex-wrap align-items-center gap-2 border-bottom pb-3">
          {user?.avatar && (
            <img
              src={user.avatar}
              alt="avatar"
              className="avatar-lg rounded-3 border border-light border-3"
            />
          )}

          <div className="d-block">
            <Link to="" className="text-dark fw-medium fs-20">
              {user?.name}
            </Link>

            {/* ✅ BLUE + ITALIC */}
            <p className="mb-0 text-primary fst-italic fs-16">
              {user?.email}
            </p>

          <p className="text-primary fst-italic fs-14 mb-0">
  Amount: OMR 5678
</p>


            <p className="">
              # {user?.id}
            </p>
          </div>

          <div className="ms-auto">
            <Dropdown>
              <DropdownToggle
                as={'a'}
                className="btn btn-sm btn-outline-light rounded arrow-none fs-16"
              >
                <IconifyIcon icon="ri:more-2-fill" />
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Download</DropdownItem>
                <DropdownItem>Export</DropdownItem>
                <DropdownItem>Import</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <p className="mt-3 d-flex align-items-center gap-2 mb-2">
          <IconifyIcon icon="solar:home-bold-duotone" className="fs-18 text-primary" />
          {properties} Properties
        </p>

        <p className="d-flex align-items-center gap-2 mt-2">
          <IconifyIcon icon="solar:map-point-wave-bold-duotone" className="fs-18 text-primary" />
          {address}
        </p>
      </CardBody>

      <CardFooter className="border-top">
        <Row className="g-2">
          <Col lg={6}>
            <Button variant="primary" className="w-100">
              <IconifyIcon icon="solar:outgoing-call-rounded-broken" className="align-middle fs-18" /> Call Us
            </Button>
          </Col>

          <Col lg={6}>
            <Button variant="light" className="w-100">
              <IconifyIcon icon="solar:chat-round-dots-broken" className="align-middle fs-16" /> Message
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

const AgentData = () => {
  const agentCardData = useFetchData(getAllAgent);

  return (
    <>
      <Row>
        {agentCardData?.map((item, idx) => (
          <Col xl={4} lg={5} key={idx}>
            <AgentCard {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AgentData;
