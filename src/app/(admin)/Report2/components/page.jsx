import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { useFetchData } from '@/hooks/useFetchData';
import { getAllAgent } from '@/helpers/data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const PropertyReportsPage = () => {
  const propertyData = useFetchData(getAllAgent);
const [fromDate, setFromDate] = useState(null);
  const [tempFromDate, setTempFromDate] = useState(null);
  const [isFromOpen, setIsFromOpen] = useState(false);

  return (
    <>
      <PageTitle title="Property Reports" />

      {/* Top Search Bar with Filters */}
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
            <CardBody style={{ padding: '1rem 1.5rem' }}>
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
                        border: '1px solid #e2e8f0',
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
                        color: '#94a3b8',
                        fontSize: '1.25rem'
                      }}
                    />
                  </div>
                </Col>

                {/* Property Count */}
                <Col lg={2} md={6}>
                  <h5 className="mb-0" style={{ fontSize: '0.938rem', fontWeight: 600, color: '#1e293b' }}>
                    311 <span style={{ color: '#64748b', fontWeight: 400 }}>Properties</span>
                  </h5>
                </Col>

                {/* Right Side Buttons */}
                <Col lg={7} md={12}>
                  <div className="d-flex justify-content-lg-end gap-2 flex-wrap">
                      
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
                      {/* <div className="d-flex gap-4 p-2 border-top " style={{ marginTop: '1rem' }}>
                        
                        
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
                         backgroundColor: 'white',
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
                        
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        padding: '0.5rem 1.25rem',
                        color: 'white',
                        fontWeight: 500
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
                        color: 'white',
                        fontWeight: 500
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

      {/* Main Content - Sidebar + Table */}
      <Row>
        {/* Left Sidebar - Filters */}
        <Col xl={3} lg={4} md={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
            <CardHeader className="bg-white border-bottom" style={{ padding: '1.25rem 1.5rem' }}>
              <div>
                <CardTitle as={'h5'} className="mb-1" style={{ fontSize: '1rem', fontWeight: 600, color: '#6c757d' }}>
                  Property
                </CardTitle>
                <p className="mb-0" style={{ fontSize: '0.813rem', color: '#8e9aaf' }}>
                  Show 15,780 Property
                </p>
              </div>
            </CardHeader>

            <CardBody style={{ padding: '1.5rem' }}>
              {/* Properties Location */}
              <div className="mb-4">
                <label 
                  htmlFor="properties-location" 
                  className="form-label mb-2"
                  style={{ fontSize: '0.813rem', fontWeight: 600, color: '' }}
                >
                  Properties Location
                </label>
                <select
                  id="properties-location"
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
                </select>
              </div>

              {/* Custom Price Range */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Custom Price Range :
                </h6>
                <div className="mb-3">
                  <input 
                    type="range" 
                    className="form-range"
                    min="1000" 
                    max="10000"
                    defaultValue="5000"
                    style={{ accentColor: '#3b4b7d' }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input 
                    className="form-control text-center" 
                    type="text" 
                    defaultValue="OMR 1000"
                    readOnly
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '0.375rem',
                      fontSize: '0.813rem',
                      padding: '0.5rem',
                      color: '#4a5568'
                    }}
                  />
                  <span className="fw-medium" style={{ fontSize: '0.813rem', color: '#6c757d' }}>to</span>
                  <input 
                    className="form-control text-center" 
                    type="text" 
                    defaultValue="OMR 10000"
                    readOnly
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '0.375rem',
                      fontSize: '0.813rem',
                      padding: '0.5rem',
                      color: '#4a5568'
                    }}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Property Type :
                </h6>
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="residential" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="residential" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Residential
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="commercial" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="commercial" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Commercial
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Properties Type */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Properties Type :
                </h6>
                <Row className="g-2">
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="allProperties" defaultChecked style={{ cursor: 'pointer', accentColor: '#3b4b7d' }} />
                      <label className="form-check-label" htmlFor="allProperties" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        All Properties
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="flat" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="flat" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Flat
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="room" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="room" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Room
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="villa" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="villa" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Villa
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="shop" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="shop" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Shop
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Bedrooms */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Bedrooms :
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  <input type="checkbox" className="btn-check" id="bhk1-page" />
                  <label className="btn btn-outline-primary" htmlFor="bhk1-page" style={{ fontSize: '0.813rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', borderColor: '#5d6eb8', color: '#5d6eb8', fontWeight: 500 }}>
                    1 BHK
                  </label>
                  <input type="checkbox" className="btn-check" id="bhk2-page" />
                  <label className="btn btn-outline-primary" htmlFor="bhk2-page" style={{ fontSize: '0.813rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', borderColor: '#5d6eb8', color: '#5d6eb8', fontWeight: 500 }}>
                    2 BHK
                  </label>
                  <input type="checkbox" className="btn-check" id="bhk3-page" defaultChecked />
                  <label className="btn" htmlFor="bhk3-page" style={{ fontSize: '0.813rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', backgroundColor: '#3b4b7d', color: 'white', border: 'none', fontWeight: 500 }}>
                    3 BHK
                  </label>
                </div>
              </div>

              {/* Accessibility Features */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Accessibility Features :
                </h6>
                <Row className="g-2">
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="balcony-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="balcony-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Balcony
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="parking-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="parking-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Parking
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="spa-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="spa-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Spa
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="pool-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="pool-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Pool
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="restaurant-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="restaurant-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Restaurant
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="fitness-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="fitness-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Fitness Club
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Rental For - First */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Rental For
                </h6>
                <Row className="g-2">
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="bachelor-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="bachelor-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Bachelor
                      </label>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="family-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="family-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Family
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Rental For - Second */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'black' }}>
                  Rental Status
                </h6>
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="advance-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="advance-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Advance Received
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rentReceived-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="rentReceived-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Rent Received
                      </label>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rentPending-page" style={{ cursor: 'pointer' }} />
                      <label className="form-check-label" htmlFor="rentPending-page" style={{ fontSize: '0.813rem', color: '#6c757d', cursor: 'pointer' }}>
                        Rent Pending
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Apply Button */}
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
            </CardBody>
          </Card>
        </Col>

        {/* Right Content - Table */}
        <Col xl={9} lg={8} md={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom bg-white" style={{ padding: '1rem 1.5rem' }}>
              <CardTitle as="h5" className="mb-0" style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b' }}>
                Property Reports
              </CardTitle>

              <Dropdown>
                <DropdownToggle
                  as="a"
                  className="btn btn-sm rounded content-none icons-center"
                  style={{
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    backgroundColor: 'white',
                    padding: '0.375rem 0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.813rem'
                  }}
                >
                  This Month
                  <IconifyIcon className="ms-1" width={14} height={14} icon="ri:arrow-down-s-line" />
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
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>P. ID</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TITLE</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TYPE</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TARGET</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ADDED BY</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AREA (SQ.FT)</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ROOMS</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FEATURES</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RENT</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                      <th style={{ padding: '0.875rem 1rem', fontSize: '0.688rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      { title: '3BHK Apartment', type: 'Apartment', target: 'Family', addedBy: 'Ali', area: 1200, rooms: 4, features: 'Balcony, Modular Kitchen', rent: '1200 OMN', status: 'Active' },
                      { title: '4BHK Villa', type: 'Apartment', target: 'Bachelor', addedBy: 'Sara', area: 1200, rooms: 3, features: 'Garden', rent: '1600 OMN', status: 'Active' },
                      { title: '3BHK Apartment', type: 'Villa', target: 'Family', addedBy: 'Ali', area: 1800, rooms: 2, features: 'Balcony, Modular Kitchen', rent: '1100 OMN', status: 'Inactive' },
                      { title: '3BHK Apartment', type: 'Apartment', target: 'Family', addedBy: 'Ali', area: 1000, rooms: 4, features: 'Kitchen', rent: '1200 OMN', status: 'Active' },
                      { title: '4BHK Villa', type: 'Villa', target: 'Bachelor', addedBy: 'Sara', area: 800, rooms: 1, features: 'Balcony, Modular Kitchen', rent: '1100 OMN', status: 'Inactive' },
                      { title: '4BHK Villa', type: 'Apartment', target: 'Family', addedBy: 'Sara', area: 1200, rooms: 2, features: 'Balcony, Modular Kitchen', rent: '1300 OMN', status: 'Active' },
                      { title: '4BHK Villa', type: 'Villa', target: 'Bachelor', addedBy: 'Ali', area: 1600, rooms: 3, features: 'Balcony', rent: '1650 OMN', status: 'Active' },
                      { title: '3BHK Apartment', type: 'Apartment', target: 'Family', addedBy: 'Sara', area: 1200, rooms: 4, features: 'Modular Kitchen', rent: '1800 OMN', status: 'Inactive' }
                    ].map((item, idx) => (
                      <tr
                        key={idx}
                        style={{ 
                          transition: 'background-color 0.2s ease',
                          borderBottom: '1px solid #f1f5f9'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.813rem' }}>12345</td>
                        <td style={{ padding: '0.875rem 1rem' }}>
                          <div className="d-flex align-items-center gap-2">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{ 
                                width: '32px', 
                                height: '32px', 
                                backgroundColor: '#e2e8f0',
                                flexShrink: 0
                              }}
                            >
                              <IconifyIcon icon="solar:home-2-broken" width={16} height={16} style={{ color: '#64748b' }} />
                            </div>
                            <span style={{ fontSize: '1rem', fontWeight: 400, color: '#1e293b' }}>
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '0.875rem 1rem', color: '#5d6eb8', fontSize: '0.813rem' }}>{item.type}</td>
                        <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.813rem' }}>{item.target}</td>
                        <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.813rem' }}>{item.addedBy}</td>
                        <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.813rem' }}>{item.area}</td>
                        <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.813rem' }}>{item.rooms}</td>
                        <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.813rem', maxWidth: '150px' }}>
                          {item.features}
                        </td>
                        <td style={{ padding: '0.875rem 1rem', color: '#64748b', fontSize: '0.813rem', fontWeight: 500 }}>
                          {item.rent}
                        </td>
                        <td style={{ padding: '0.875rem 1rem' }}>
                          <span
                            className="badge rounded-pill px-2 py-1"
                            style={{
                              backgroundColor: item.status === 'Active' ? '#d1fae5' : '#fee2e2',
                              color: item.status === 'Active' ? '#065f46' : '#991b1b',
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.875rem 1rem' }}>
                          <div className="d-flex gap-1">
                            <Button 
                              variant="light" 
                              size="sm"
                              className="rounded p-1"
                              style={{ 
                                border: '1px solid #e2e8f0',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <IconifyIcon icon="solar:eye-broken" width={14} height={14} style={{ color: '#64748b' }} />
                            </Button>
                            <Button 
                              size="sm"
                              className="rounded p-1"
                              style={{ 
                                backgroundColor: '#ede9fe',
                                color: '#5d6eb8',
                                border: 'none',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <IconifyIcon icon="solar:pen-2-broken" width={14} height={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>

            {/* Pagination */}
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

export default PropertyReportsPage;