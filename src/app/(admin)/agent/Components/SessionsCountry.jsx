import IconifyIcon from '@/components/wrappers/IconifyIcon';
import WorldVectorMap from '@/components/VectorMap/WorldMap';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap';
import { countryData } from '../data';
import { Fragment } from 'react';

const SessionsCountry = () => {
  // Map options
  const worldMapOptions = {
    map: 'world',
    zoomOnScroll: false,
    zoomButtons: false,
    markersSelectable: false,
    markers: [
      { name: 'Muscat', coords: [56.1304, -106.3468] },
      { name: 'Salalah', coords: [37.0902, -95.7129] },
      { name: 'Seeb', coords: [-14.235, -51.9253] },
      { name: 'Sohar', coords: [61, 105] },
      { name: 'Nizwa', coords: [35.8617, 104.1954] }
    ],
    markerStyle: {
      initial: { fill: '#5B8DEC' },
      selected: { fill: '#ed5565' }
    },
    labels: {
      markers: {
        render: marker => marker.name
      }
    },
    regionStyle: {
      initial: {
        fill: 'rgba(169,183,197, 0.3)',
        fillOpacity: 1
      }
    }
  };

  return (
    <Col lg={7}>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center border-0">
          <CardTitle as={'h4'}>Leads</CardTitle>
          <Dropdown>
            <DropdownToggle 
              as={'a'} 
              className="btn btn-sm btn-outline-light rounded content-none icons-center" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Oman <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Oman</DropdownItem>
              <DropdownItem>ABCD</DropdownItem>
              <DropdownItem>China</DropdownItem>
              <DropdownItem>Canada</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        
        <CardBody>
          <Row className="align-items-start">
            {/* Left Side - Total Leads & Map */}
            <Col lg={6}>
              {/* Total Leads */}
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="avatar-md bg-light bg-opacity-50 rounded flex-centered">
                  <IconifyIcon 
                    icon="solar:user-rounded-broken" 
                    width={32} 
                    height={32} 
                    className="fs-32 text-primary" 
                  />
                </div>
                <div>
                  <p className="mb-0 fs-20 text-dark fw-medium">745</p>
                  <small className="text-muted">(Total Leads)</small>
                </div>
              </div>
              
              {/* Map */}
              <div style={{ height: '280px' }}>
                <WorldVectorMap 
                  height="280px" 
                  width="100%" 
                  options={worldMapOptions} 
                />
              </div>
            </Col>
            
            {/* Right Side - Country Stats */}
            <Col lg={6}>
              <div className="p-3 bg-light bg-opacity-10 rounded">
                {countryData.map((item, idx) => (
                  <Fragment key={idx}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p className="mb-0">
                        <IconifyIcon icon={item.icon} className="fs-16 align-middle me-2" />
                        <span className="align-middle fw-medium">{item.country}</span>
                      </p>
                      <p className="mb-0 fw-semibold">{item.view}</p>
                    </div>
                    <Row className="align-items-center mb-3">
                      <Col>
                        <ProgressBar 
                          now={item.progress} 
                          variant={item.variant} 
                          className="progress-soft" 
                          style={{ height: '6px' }}
                        />
                      </Col>
                      <Col xs={'auto'}>
                        <p className="mb-0 fs-12 text-muted">{item.progress}%</p>
                      </Col>
                    </Row>
                  </Fragment>
                ))}
                
                <div className="text-center mt-3">
                  <Link to="" className="link-primary d-inline-flex align-items-center gap-1 text-decoration-none">
                    <span>Add Other</span>
                    <IconifyIcon icon="ri:add-line" width={18} height={18} />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SessionsCountry;