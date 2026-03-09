// // import PageTitle from '@/components/PageTitle';
// // import IconifyIcon from '@/components/wrappers/IconifyIcon';
// // import { Card, CardHeader, Col, Row } from 'react-bootstrap';
// // import Agentlist from './Agentlist';
// // import PropertiesFilter from './PropertiesFilter';
// // const ListViewPage = () => {
// //   return <>
// //       <PageTitle  title="Landlord List" />
// //       <PropertiesFilter />
      

// //       <Row>
// //         <Col lg={12}>
// //           <Card>
// //             <CardHeader className="border-0">
// //               <Row className="justify-content-between">
// //                 <Col lg={6}>
// //                   <Row className="align-items-center">
// //                     <Col lg={6}>
// //                       <form className="app-search d-none d-md-block me-auto">
// //                         <div className="position-relative">
// //                           <input type="search" className="form-control" placeholder="Search Landlord" autoComplete="off" />
// //                           <IconifyIcon icon="solar:magnifer-broken" className="search-widget-icon" />
// //                         </div>
// //                       </form>
// //                     </Col>
// //                     <Col lg={4}>
// //                       <h5 className="text-dark fw-medium mb-0">
// //                         545 <span className="text-muted"> Landlord</span>
// //                       </h5>
// //                     </Col>
// //                   </Row>
// //                 </Col>
// //                 <Col lg={6}>
// //                   <div className="text-md-end mt-3 mt-md-0">
// //                     <button type="button" className="btn btn-outline-primary me-2">
// //                       <IconifyIcon icon="ri:settings-2-line" className="me-1" />
// //                       More Setting
// //                     </button>
// //                     <button type="button" className="btn btn-outline-primary me-2">
// //                       <IconifyIcon icon="ri:filter-line" className="me-1" /> Filters
// //                     </button>
                    
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </CardHeader>
// //           </Card>
// //         </Col>
// //       </Row>
// //       <Agentlist />
// //     </>;
// // };
// // export default ListViewPage;
// import PageTitle from '@/components/PageTitle';
// import IconifyIcon from '@/components/wrappers/IconifyIcon';
// import { Card, CardHeader, Col, Row } from 'react-bootstrap';
// import Agentlist from './Agentlist';
// import PropertiesFilter from './PropertiesFilter';

// const ListViewPage = () => {
//   return (
//     <>
//       <PageTitle title="Landlord List" />
      
//       <Row>
//         {/* Left Sidebar - Filters */}
//         <Col xl={3} lg={4} md={12}>
//           <PropertiesFilter />
//         </Col>

//         {/* Right Content - Search & Table */}
//         <Col xl={9} lg={8} md={12}>
//           {/* Search Bar & Actions */}
//           <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: '0.5rem' }}>
//             <CardHeader className="border-0 bg-white" style={{ padding: '1rem 1.5rem' }}>
//               <Row className="align-items-center g-3">
//                 {/* Left Side - Search & Count */}
//                 <Col lg={6} md={12}>
//                   <Row className="align-items-center g-2">
//                     <Col lg={7} md={7} sm={12}>
//                       <form className="app-search">
//                         <div className="position-relative">
//                           <input 
//                             type="search" 
//                             className="form-control" 
//                             placeholder="Search Landlord" 
//                             autoComplete="off"
//                             style={{
//                               paddingLeft: '2.5rem',
//                               border: '1px solid #dee2e6',
//                               borderRadius: '0.5rem',
//                               fontSize: '0.875rem'
//                             }}
//                           />
//                           <IconifyIcon 
//                             icon="solar:magnifer-broken" 
//                             className="search-widget-icon"
//                             style={{
//                               position: 'absolute',
//                               left: '0.75rem',
//                               top: '50%',
//                               transform: 'translateY(-50%)',
//                               color: '#6c757d',
//                               fontSize: '1.25rem'
//                             }}
//                           />
//                         </div>
//                       </form>
//                     </Col>
//                     <Col lg={5} md={5} sm={12}>
//                       <h5 className="text-dark fw-semibold mb-0" style={{ fontSize: '1rem' }}>
//                         545 <span className="text-muted fw-normal"> Landlord</span>
//                       </h5>
//                     </Col>
//                   </Row>
//                 </Col>

//                 {/* Right Side - Action Buttons */}
//                 <Col lg={6} md={12}>
//                   <div className="d-flex justify-content-lg-end gap-2">
//                     <button 
//                       type="button" 
//                       className="btn"
//                       style={{
//                         border: '1px solid #5d5fef',
//                         color: '#5d5fef',
//                         backgroundColor: 'white',
//                         borderRadius: '0.5rem',
//                         padding: '0.5rem 1rem',
//                         fontSize: '0.875rem',
//                         fontWeight: 500
//                       }}
//                     >
//                       <IconifyIcon icon="ri:settings-2-line" className="me-1" width={16} height={16} />
//                       More Setting
//                     </button>
//                     <button 
//                       type="button" 
//                       className="btn"
//                       style={{
//                         border: '1px solid #5d5fef',
//                         color: '#5d5fef',
//                         backgroundColor: 'white',
//                         borderRadius: '0.5rem',
//                         padding: '0.5rem 1rem',
//                         fontSize: '0.875rem',
//                         fontWeight: 500
//                       }}
//                     >
//                       <IconifyIcon icon="ri:filter-line" className="me-1" width={16} height={16} />
//                       Filters
//                     </button>
//                   </div>
//                 </Col>
//               </Row>
//             </CardHeader>
//           </Card>

//           {/* Table */}
//           <Agentlist />
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ListViewPage;



import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetchData } from '@/hooks/useFetchData';
import { getAllAgent } from '@/helpers/data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";






const TenantReportsPage = () => {

 const tenantData = useFetchData(getAllAgent);

  const [fromDate, setFromDate] = useState(null);
  const [tempFromDate, setTempFromDate] = useState(null);  // ✅ Ye change karo
  const [isFromCalendarOpen, setIsFromCalendarOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  return (
 <>
      <PageTitle title="Reports and Analysis" />

      
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

               
                <Col lg={2} md={6}>
                  <h5 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>
                    311 <span style={{ color: '#6c757d', fontWeight: 400 }}>Tenant</span>
                  </h5>
                </Col>

              
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

      {/* Main Content - Sidebar + Table */}
      <Row>
        {/* Left Sidebar - Filters */}
        <Col xl={3} lg={4} md={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
            {/* Header */}
            <CardHeader className="bg-white border-bottom" style={{ padding: '1.25rem 1.5rem' }}>
              <div>
                <CardTitle as={'h4'} className="mb-1" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                  Properties
                </CardTitle>
                <p className="mb-0" style={{ fontSize: '0.875rem', color: '#6c757d' }}>
                  Show 15,780 Properties
                </p>
              </div>
            </CardHeader>

            {/* Body */}
            <CardBody style={{ padding: '1.5rem' }}>
              {/* Lead Location */}
              <div className="mb-4">
                <label className="form-label mb-2" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  Lead Location
                </label>
                <select
                  className="form-select"
                  style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <option>Choose a city</option>
                  <option>London</option>
                  <option>Paris</option>
                  <option>New York</option>
                </select>
              </div>

              {/* Tenants Rent */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600,color:"black" }}>
                  Tenants Rent :
                </h5>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rentPaid" />
                    <label className="form-check-label" htmlFor="rentPaid" style={{ fontSize: '0.875rem' }}>
                      Rent Paid
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rentPending" />
                    <label className="form-check-label" htmlFor="rentPending" style={{ fontSize: '0.875rem' }}>
                      Rent Pending
                    </label>
                  </div>
                </div>
              </div>

              {/* Tenant Type */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600,color:"black" }}>
                  Tenant Type :
                </h5>
                <div className="d-flex flex-column gap-2">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="newTenant" defaultChecked />
                    <label className="form-check-label" htmlFor="newTenant" style={{ fontSize: '0.875rem' }}>
                      New Tenant
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="activeTenant" />
                    <label className="form-check-label" htmlFor="activeTenant" style={{ fontSize: '0.875rem' }}>
                      Active
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="inactiveTenant" />
                    <label className="form-check-label" htmlFor="inactiveTenant" style={{ fontSize: '0.875rem' }}>
                      Inactive Tenant
                    </label>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600,color:"black" }}>
                  Bedrooms :
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  <input type="checkbox" className="btn-check" id="bhk1" />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="bhk1"
                    style={{
                      fontSize: '0.875rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem'
                    }}
                  >
                    1 BHK
                  </label>

                  <input type="checkbox" className="btn-check" id="bhk2" />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="bhk2"
                    style={{
                      fontSize: '0.875rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem'
                    }}
                  >
                    2 BHK
                  </label>

                  <input type="checkbox" className="btn-check" id="bhk3" defaultChecked />
                  <label
                    className="btn"
                    htmlFor="bhk3"
                    style={{
                      fontSize: '0.875rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      backgroundColor: '#3b4b7d',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    3 BHK
                  </label>
                </div>
              </div>

              {/* Lead Origin */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600,color:"black" }}>
                  Lead Origin
                </h5>
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="web" />
                      <label className="form-check-label" htmlFor="web" style={{ fontSize: '0.875rem' }}>
                        Web
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="call" />
                      <label className="form-check-label" htmlFor="call" style={{ fontSize: '0.875rem' }}>
                        Call
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="whatsapp" />
                      <label className="form-check-label" htmlFor="whatsapp" style={{ fontSize: '0.875rem' }}>
                        WhatsApp
                      </label>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="referral" />
                      <label className="form-check-label" htmlFor="referral" style={{ fontSize: '0.875rem' }}>
                        Referral
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Rental For */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600,color:"black" }}>
                  Rental For
                </h5>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rentPaid" />
                    <label className="form-check-label" htmlFor="rentPaid" style={{ fontSize: '0.875rem' }}>
                      Bachelor
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rentPending" />
                    <label className="form-check-label" htmlFor="rentPending" style={{ fontSize: '0.875rem' }}>
                      Family
                    </label>
                  </div>
                </div>
              </div>
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
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Tenant ID</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 500, color: '#6c757d', textTransform: 'uppercase' }}>Tenant Photo & Name</th>
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
                              style={{ width: '40px', height: '40px'  }}
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