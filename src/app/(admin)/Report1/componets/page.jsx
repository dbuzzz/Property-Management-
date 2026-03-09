import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { useFetchData } from '@/hooks/useFetchData';
import { getAllAgent } from '@/helpers/data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const TenantReportsPage = () => {
  const tenantData = useFetchData(getAllAgent);

  // Date picker states
  const [fromDate, setFromDate] = useState(null);
  const [tempFromDate, setTempFromDate] = useState(null);
  const [isFromOpen, setIsFromOpen] = useState(false);

  // Calendar Footer Component
  const CalendarFooter = ({ onCancel, onApply }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '4rem',
      paddingTop: '1rem',
      marginTop: '17rem',
      borderTop: '1px solid #f1f5f9'

    }}>
      <button 
        style={{
          padding: '0.5rem 1.25rem',
          fontSize: '0.875rem',
          border: '1px solid #e2e8f0',
          backgroundColor: 'white',
          color: '#64748b',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}
        onClick={onCancel}
      >
        Cancel
      </button>
      <button 
        style={{
          padding: '0.5rem 1.25rem',
          fontSize: '0.875rem',
          border: 'none',
          backgroundColor: '#3b4b7d',
          color: 'white',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: 500,
          marginRight: '5rem',
          width: '150px'
        }}
        onClick={onApply}
      >
        Apply
      </button>
    </div>
  );

  return (
    <>
      <PageTitle title="Reports and Analysis" />

      

      {/* Top Search Bar with Filters */}
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
            <CardBody style={{ padding: '1.25rem 1.5rem' }}>
              <Row className="align-items-center g-3">
                {/* Search */}
                <Col lg={3} md={6}>
                  <div className="position-relative">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Reports and Analysis"
                      style={{
                        paddingLeft: '2.5rem',
                        border: '1px solid #dee2e6',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                      }}
                    />
                    <IconifyIcon
                      icon="solar:magnifer-broken"
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6c757d',
                        fontSize: '1.25rem'
                      }}
                    />
                  </div>
                </Col>

                {/* Landlord Count */}
                <Col lg={2} md={6}>
                  <h5 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>
                    311 <span style={{ color: '#6c757d', fontWeight: 400 }}>Landlord</span>
                  </h5>
                </Col>

                {/* Right Side Buttons */}
                <Col lg={7} md={12}>
                  <div className="d-flex justify-content-lg-end gap-2 flex-wrap">
                    {/* From Date Picker with Cancel & Apply */}
                    
                   <DatePicker
  selected={fromDate}
  onChange={(date) => setFromDate(date)}
  dateFormat="dd/MM/yyyy"
  calendarClassName="custom-calendar"
  customInput={
    <Button
      style={{
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
        border: '1px solid #e2e8f0',
        color: '#64748b',
        backgroundColor: 'white',
      }}
    >
      <IconifyIcon
        icon="solar:calendar-broken"
        className="me-1"
        width={18}
        height={20}
      />
      {fromDate ? fromDate.toLocaleDateString() : "From Date"}
    </Button>
  }
>
  {/* <div className="d-flex gap-3 p-3 border-top justify-content-center" style={{ marginTop: '1rem' }}>
    
    
  </div> */}
</DatePicker>

<style>
  {`
    .custom-calendar {
      width: 340px !important;
      font-size: 0.95rem !important;
    }

    .custom-calendar .react-datepicker__month-container {
      width: 100%;
    }

    .custom-calendar .react-datepicker__day,
    .custom-calendar .react-datepicker__day-name {
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      margin: 0.15rem;
      font-size: 0.9rem;
    }

    .custom-calendar .react-datepicker__header {
      padding: 1.2rem 0;
      background-color: white;
      border-bottom: 1px solid #e2e8f0;
    }

    .custom-calendar .react-datepicker__current-month {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      color: #1a202c;
    }

    .custom-calendar .react-datepicker__day--selected {
      background-color: #3182ce;
      color: white;
      border-radius: 50%;
    }

    .custom-calendar .react-datepicker__day:hover {
      border-radius: 50%;
      background-color: #e2e8f0;
    }

    .custom-calendar .react-datepicker__navigation {
      top: 1.2rem;
    }
  `}
</style>


                    <Button
                      style={{
                        backgroundColor: '#3b4b7d',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        padding: '0.5rem 1rem',
                        border: '1px solid #e2e8f0',
                        color: '#64748b',
                        backgroundColor: 'white'
                      }}
                    >
                      <IconifyIcon icon="solar:calendar-broken" className="me-1" width={16} height={16} />
                      To Date
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#3b4b7d',
                        borderColor: '#3b4b7d',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        padding: '0.5rem 1.25rem',
                        color: 'white'
                      }}
                    >
                      Apply Filter
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#3b4b7d',
                        borderColor: '#3b4b7d',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        padding: '0.5rem 1.25rem',
                        color: 'white'
                      }}
                    >
                      Export PDF
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Baaki ka code same rahega... */}
      {/* Main Content - Sidebar + Table */}
      <Row>
        {/* Left Sidebar - Filters */}
        <Col xl={3} lg={4} md={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
            <CardHeader className="bg-white border-bottom" style={{ padding: '1.25rem 1.5rem' }}>
              <div>
                <CardTitle as={'h5'} className="mb-1" style={{ fontSize: '1rem', fontWeight: 600, color: '#6c757d' }}>
                  Landlord Properties
                </CardTitle>
                <p className="mb-0" style={{ fontSize: '0.813rem', color: '#8e9aaf' }}>
                  Show 15,780 Landlord
                </p>
              </div>
            </CardHeader>

            <CardBody style={{ padding: '1.5rem' }}>
              {/* Landlord Location */}
              <div className="mb-4">
                <label className="form-label mb-2" style={{ fontSize: '0.813rem', fontWeight: 600, color: '#4a5568' }}>
                  Landlord Location
                </label>
                <select
                  className="form-select"
                  style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '0.5rem',
                    fontSize: '0.813rem',
                    padding: '0.625rem 0.75rem',
                    color: '#8e9aaf'
                  }}
                >
                  <option>Choose a city</option>
                  <option>London</option>
                  <option>Paris</option>
                  <option>New York</option>
                </select>
              </div>

              {/* Landlord Rent */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black', }}>
                  Landlord Rent :
                </h6>
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rentPaid" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="rentPaid" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Rent Paid
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rentPending" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="rentPending" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Rent Pending
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Landlord Type */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Landlord Type :
                </h6>
                <div className="d-flex flex-column gap-2">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="newLandlord" defaultChecked style={{ cursor: 'pointer', accentColor: '#3b4b7d' }} />
                    <label className="form-check-label" htmlFor="newLandlord" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                      New Landlord
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="activeLandlord" style={{ cursor: 'pointer' }} />
                    <label className="form-check-label" htmlFor="activeLandlord" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                      Active
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="inactiveLandlord" style={{ cursor: 'pointer' }} />
                    <label className="form-check-label" htmlFor="inactiveLandlord" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                      Inactive Landlord
                    </label>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Bedrooms :
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  <input type="checkbox" className="btn-check" id="bhk1-land" />
                  <label className="btn btn-outline-primary" htmlFor="bhk1-land" style={{ fontSize: '0.813rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', borderColor: '#5d6eb8', color: '#5d6eb8', fontWeight: 500 }}>
                    1 BHK
                  </label>

                  <input type="checkbox" className="btn-check" id="bhk2-land" />
                  <label className="btn btn-outline-primary" htmlFor="bhk2-land" style={{ fontSize: '0.813rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', borderColor: '#5d6eb8', color: '#5d6eb8', fontWeight: 500 }}>
                    2 BHK
                  </label>

                  <input type="checkbox" className="btn-check" id="bhk3-land" defaultChecked />
                  <label className="btn" htmlFor="bhk3-land" style={{ fontSize: '0.813rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', backgroundColor: '#3b4b7d', color: 'white', border: 'none', fontWeight: 500 }}>
                    3 BHK
                  </label>
                </div>
              </div>

              {/* Landlord Origin */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Landlord Origin
                </h6>
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="web-land" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="web-land" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Web
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="call-land" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="call-land" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Call
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="whatsapp-land" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="whatsapp-land" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        WhatsApp
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="referral-land" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="referral-land" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Referral
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Rental For */}
              <div className="mb-0">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Rental For
                </h6>
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="bachelor-land" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="bachelor-land" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Bachelor
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="family-land" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="family-land" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Family
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Button 
                    className="w-100"
                    style={{
                      backgroundColor: '#3b4b7d',
                      borderColor: '#3b4b7d',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'white'
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Right Content - Table */}
        <Col xl={9} lg={8} md={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom bg-white">
              <CardTitle as="h4" className="mb-0">Tenant Reports</CardTitle>

              <Dropdown>
                <DropdownToggle
                  as="a"
                  className="btn btn-sm rounded content-none icons-center"
                  style={{
                    border: '1px solid #dee2e6',
                    color: '#6c757d',
                    backgroundColor: 'white',
                    padding: '0.375rem 0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  This Month
                  <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>Download</DropdownItem>
                  <DropdownItem>Export</DropdownItem>
                  <DropdownItem>Import</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>

            <CardBody className="p-0">
              <div className="table-responsive">
                <table className="table align-middle text-nowrap mb-0">
                  <thead style={{  backgroundColor: '#F9F9FC' }}>
                    <tr>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Landlord ID</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Landlord Photo & Name</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Source</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Contact</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Handled By</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Converted</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Nationality</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tenantData?.slice(0, 8).map((item, idx) => (
                      <tr
                        key={idx}
                        style={{ transition: 'background-color 0.2s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '1rem', color: '#6c757d' }}>12345</td>
                        <td style={{ padding: '1rem' }}>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={item.user?.avatar}
                              alt="avatar"
                              className="rounded-circle"
                              style={{ width: '40px', height: '40px' }}
                            />
                            <span className="text-dark fw-medium fs-16">{item.user?.name}</span>
                            
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: '#6c757d' }}>
                          {idx % 3 === 0 ? 'Web' : idx % 3 === 1 ? 'WhatsApp' : 'App'}
                        </td>
                        <td style={{ padding: '1rem', color: '#6c757d' }}>1234-5678-910</td>
                        <td style={{ padding: '1rem', color: '#6c757d' }}>
                          {idx % 2 === 0 ? 'Ali' : 'Sara'}
                        </td>
                        <td style={{ padding: '1rem', color: '#6c757d' }}>
                          {idx % 2 === 0 ? 'Yes' : 'No'}
                        </td>
                        <td style={{ padding: '1rem', color: '#6c757d' }}>
                          {idx % 3 === 0 ? 'Omani' : idx % 3 === 1 ? 'Indian' : 'British'}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span
                            className="badge rounded-pill px-3 py-1"
                            style={{
                              backgroundColor: item.user?.status === 'Active' ? '#d4edda' : '#f8d7da',
                              color: item.user?.status === 'Active' ? '#155724' : '#721c24',
                              fontSize: '0.75rem'
                            }}
                          >
                            {item.user?.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div className="d-flex gap-2">
                            <Button variant="light" size="sm" className="rounded" style={{ padding: '0.375rem 0.5rem' }}>
                              <IconifyIcon icon="solar:eye-broken" width={16} height={16} />
                            </Button>
                            <Button
                              size="sm"
                              className="rounded"
                              style={{
                                padding: '0.375rem 0.5rem',
                                backgroundColor: '#f0f4ff',
                                color: '#5d5fef',
                                border: 'none'
                              }}
                            >
                              <IconifyIcon icon="solar:pen-2-broken" width={16} height={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <div className="border-top" style={{ padding: '1rem 1.5rem' }}>
              <nav>
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <a 
                      className="page-link" 
                      href="#"
                      style={{ 
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        padding: '0.375rem 0.75rem',
                        marginRight: '0.25rem',
                        color: '#64748b',
                        fontSize: '0.813rem'
                      }}
                    >
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a 
                      className="page-link" 
                      href="#"
                      style={{ 
                        backgroundColor: '#3b4b7d',
                        borderColor: '#3b4b7d',
                        borderRadius: '0.375rem',
                        marginRight: '0.25rem',
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.813rem'
                      }}
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a 
                      className="page-link" 
                      href="#"
                      style={{ 
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        marginRight: '0.25rem',
                        padding: '0.375rem 0.75rem',
                        color: '#64748b',
                        fontSize: '0.813rem'
                      }}
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a 
                      className="page-link" 
                      href="#"
                      style={{ 
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        marginRight: '0.25rem',
                        padding: '0.375rem 0.75rem',
                        color: '#64748b',
                        fontSize: '0.813rem'
                      }}
                    >
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a 
                      className="page-link" 
                      href="#"
                      style={{ 
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        padding: '0.375rem 0.75rem',
                        color: '#64748b',
                        fontSize: '0.813rem'
                      }}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TenantReportsPage;