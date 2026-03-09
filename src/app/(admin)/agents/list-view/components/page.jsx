import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardHeader, Col, Row } from 'react-bootstrap';
import AgentList from './AgentList';
const ListViewPage = () => {
  return <>
      <PageTitle  title="Landlord List" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <Row className="justify-content-between">
                <Col lg={6}>
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <form className="app-search d-none d-md-block me-auto">
                        <div className="position-relative">
                          <input type="search" className="form-control" placeholder="Search Landlord" autoComplete="off" />
                          <IconifyIcon icon="solar:magnifer-broken" className="search-widget-icon" />
                        </div>
                      </form>
                    </Col>
                    <Col lg={4}>
                      <h5 className="text-dark fw-medium mb-0">
                        545 <span className="text-muted"> Landlord</span>
                      </h5>
                    </Col>
                  </Row>
                </Col>
     <Col lg={6}>
  <div className="text-md-end mt-3 mt-md-0">
    <button 
      type="button" 
      className="btn btn-outline-primary me-2"
      style={{
        '--bs-btn-hover-bg': '#5D7186',
        '--bs-btn-hover-border-color': '#5D7186',
        '--bs-btn-hover-color': '#fff',
        minWidth: '150px'  // ✅ Equal width
      }}
    >
      <IconifyIcon icon="ri:settings-2-line" className="me-1" />
      More Setting
    </button>
    
    <button 
      type="button" 
      className="btn btn-outline-primary me-2"
      style={{
        '--bs-btn-hover-bg': '#5D7186',
        '--bs-btn-hover-border-color': '#5D7186',
        '--bs-btn-hover-color': '#fff',
        minWidth: '150px'  // ✅ Equal width
      }}
    >
      <IconifyIcon icon="ri:filter-line" className="me-1" /> 
      Filters
    </button>
  </div>
</Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <AgentList />
    </>;
};
export default ListViewPage;