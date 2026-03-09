import ChoicesFormInput from '@/components/from/ChoicesFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody, Col, Row, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useState } from 'react';
import { useEffect } from 'react';
import  './PropertyAdd.css';

/* ================= SCHEMA ================= */
const schema = yup.object({});

const PropertyAdd = () => {
  const [propertyType , setPropertyType] = useState('flat')
  const [tenantType, setTenantType] = useState('Individual');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ code: 'OM', name: 'Oman' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
   const countries = [
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'US', name: 'U.S.A' },
    { code: 'DK', name: 'Denmark' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'IN', name: 'India' },
    { code: 'OM', name: 'Oman' },
    { code: 'ES', name: 'Spain' },
    { code: 'AE', name: 'United Arab Emirates' }
  ];
  
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {}
  });
  // Add CSS for dropdown spacing and emoji rendering
    useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
      
        
        .custom-country-dropdown {
          position: relative;
        }
        
        .country-select-box {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .country-select-box:hover {
          border-color: #86b7fe;
        }
        
        .country-dropdown-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ced4da;
          border-radius: 4px;
          margin-top: 4px;
          max-height: 250px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .country-dropdown-item {
          padding: 10px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s;
        }
        
        .country-dropdown-item:hover {
          background: #f8f9fa;
        }
        
        .country-flag {
          width: 24px;
          height: 18px;
          display: inline-block;
          border-radius: 2px;
          object-fit: cover;
        }
        
        .country-name {
          font-size: 14px;
          color: #333;
        }
        
        .dropdown-arrow {
          font-size: 12px;
          color: #666;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }, []);

  return (
    <form onSubmit={handleSubmit(() => {})}>

      {/* ================= HEADER ================= */}
     

  {/* <option value="flat">Flat / Apartment</option>
  <option value="villa">Villa/Banglow</option>
  <option value="office">Commercial</option>
  <option value="office">werehouse</option> */}

  
{/* ASSIGN PROPERTY TO TENANT - HEADER */}
<div style={{
  backgroundColor: '#f5f5f5',
  padding: '25px 24px',
  borderRadius: '8px',
  marginBottom: '1px'
}}>
  <h4 style={{
    margin: 0,
    fontSize: '25px',
    fontWeight: '600',
    color: '#3d5a80'
  }}>
    Assign Property to Tenant
  </h4>
</div>
           
          
      {/* ================= BASIC PROPERTY DETAILS ================= */}
      <Card className="mb-4">
        <CardBody>
<h4 className="fw-semibold">
  {propertyType === 'flat' && 'Assignment Information'}
 
</h4>
          <hr />
          <Row className="g-3">
                       <Col lg={4}><TextFormInput control={control}style ={{ backgroundColor: '#F9F9FC' }} name="property_code" label="Assignment Id" placeholder="Auto-Generated" /></Col>


            {propertyType === 'flat' && 
            <>
            <Col lg={4}><TextFormInput control={control}style ={{ backgroundColor: '#F9F9FC' }} name="Assignment Dtae" label="Assignment Date" placeholder="Auto-Generated" /></Col>
           
                        <Col lg={4}><TextFormInput control={control}style ={{ backgroundColor: '#F9F9FC' }} name="Assignment " label="Assigned By" placeholder="Employee Name" /></Col>

            <Col lg={4}>
              <label className="form-label">Status</label>
              <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Cancelled</option>
                <option>Done</option>
              </ChoicesFormInput>
            </Col>

           
          
</>}

           
           
           
          
         
            
          </Row>
        </CardBody>
      </Card>

      {/* ================= FLAT CONFIGURATION ================= */}
   

      {/* ================= OUTDOOR & EXCLUSIVE FEATURES (VILLA ONLY) ================= */}
      {propertyType === 'villa' && (
        <Card className="mb-4">
          <CardBody>
            <h4 className="fw-semibold">Outdoor & Exclusive Features</h4>
            <hr />
            <Row className="g-3">
              {[
                'Private Garden /  Lawn','Private Parking','Swiming Pool','Terrace / Rooftop Access','Boundry Wall',
                'Driveway'
              ].map(item => (
                <Col lg={3} key={item}>
                  <Form.Check type="checkbox" label={item} />
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      )}

      {/* ================= COMMERCIAL INFRASTRUCTURE ================= */}
      {propertyType === 'commercial' && (
        <Card className="mb-4">
          {/* <CardBody>
            <h4 className="fw-semibold">Commercial Infrastructure</h4>
            <hr />
            <Row className="g-3">
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Pwer Load (KW) " style ={{ backgroundColor: '#F9F9FC' }}/></Col>
              <Col lg={4}>
                <label className="form-label">DG / Power Backup</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">Lift Type</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Passanger</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>
              <Col lg={4}><TextFormInput control={control} name="security_deposit" label="Fire Safety Compliance"style={{ backgroundColor: '#F9F9FC' }}/></Col>
              <Col lg={4}>
                <label className="form-label">Emergency Exit</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">Parking Availability</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Open</option>
                  <option>Close</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">CCTV / Security</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>
            </Row>
          </CardBody> */}
        </Card>
      )}

      {/* ================= WAREHOUSE INFRASTRUCTURE & UTILITIES ================= */}
      {propertyType === 'warehouse' && (
        <Card className="mb-4">
          {/* <CardBody>
            <h4 className="fw-semibold">Infrastructure & Utilities</h4>
            <hr />
            <Row className="g-3">
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Power Supply (KW)" style={{ backgroundColor: '#F9F9FC' }}/></Col>
            
              <Col lg={4}>
                <label className="form-label">Transformer Available </label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">DG Set / Backup</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">Water Supply Source</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Borewell</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">Drainage System</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">Internet / Fiber</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>
            </Row>
          </CardBody> */}
        </Card>
      )}

      {/* ================= WAREHOUSE LOGISTICS & VEHICLE ACCESS ================= */}
      {propertyType === 'warehouse' && (
        <Card className="mb-4">
          {/* <CardBody>
            <h4 className="fw-semibold">Logistics & Vehicle Access</h4>
            <hr />
            <Row className="g-3">
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Entry Gate Width(Ft)" style={{ backgroundColor: '#F9F9FC' }}/></Col>
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Road Width(Ft)" style={{ backgroundColor: '#F9F9FC' }}/></Col>
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Truck Parking Capacity" style={{ backgroundColor: '#F9F9FC' }}/></Col>    
              <Col lg={4}>
                <label className="form-label">Container Access</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>20ft</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">Turning Radius</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Adequate</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

              <Col lg={4}>
                <label className="form-label">Weighbridge Nearby</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Yes</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>
            </Row>
          </CardBody> */}
        </Card>
      )}

      
                        
      {/* ================= RENTAL & FINANCIAL DETAILS ================= */}
      {/* ================= RENTAL & FINANCIAL DETAILS ================= */}
{/* ================= FLAT ================= */}
{propertyType === 'flat' && (
  <Card className="mb-4">
   <CardBody>
  <h4 className="fw-semibold">Property Details</h4>
  <hr />
  <Row className="g-3">

    <Col lg={4}>
      <label className="form-label">Property Type</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Flat">Flat</option>
        <option value="Villa">Villa</option>
        <option value="Commercial">Commercial</option>
        <option value="Warehouse">Warehouse</option>
      </select>
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="building_name" label="Building / Project Name" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <label className="form-label">Unit / Flat / Shop Number</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="">Select</option>
      </select>
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="floor_number" label="Floor Number" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="property_area" label="Property Area (Sq Ft)" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <label className="form-label">Property Status</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Vacant">Vacant</option>
        <option value="Reserved">Reserved</option>
        <option value="Occupied">Occupied</option>
      </select>
    </Col>

  </Row>
</CardBody>
  </Card>
)}


{/* ================= VILLA ================= */}
{propertyType === 'villa' && (
  <Card className="mb-4">
    {/* <CardBody>
      <h4 className="fw-semibold">Property Details</h4>
      <hr />
      <Row className="g-3">
        <Col lg={4}><TextFormInput control={control} name="Property Type" label="Monthly Rent" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="security_deposit" label="Security Deposit" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="maintenance" label="Maintenance (Monthly)" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}>
          <label className="form-label">Electricity Charges</label>
          <ChoicesFormInput className="form-control"><option>Meter</option></ChoicesFormInput>
        </Col>
        <Col lg={4}>
          <label className="form-label">Water Charges</label>
          <ChoicesFormInput className="form-control"><option>Meter</option></ChoicesFormInput>
        </Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Gardening Charges" style={{ backgroundColor: '#F9F9FC' }} /></Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Other Charges" style={{ backgroundColor: '#F9F9FC' }} /></Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Late Fee Rule" style={{ backgroundColor: '#F9F9FC' }}/></Col>
      </Row>
    </CardBody> */}
  </Card>
)}


{/* ================= COMMERCIAL ================= */}
{propertyType === 'commercial' && (
  <Card className="mb-4">
    {/* <CardBody>
      <h4 className="fw-semibold">Rental & Financial Details</h4>
      <hr />
      <Row className="g-3">
        <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Monthly Rent" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="security_deposit" label="Security Deposit" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="maintenance" label="Maintenance Charges" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}>
          <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>GST Applicable</label>
          <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
            <option>Yes</option>
            <option>No</option>
          </ChoicesFormInput>
        </Col>
        <Col lg={4}><TextFormInput control={control} name="maintenance" label="GST %" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}>
          <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>Electricity Charges</label>
          <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}><option>Meter</option></ChoicesFormInput>
        </Col>
        <Col lg={4}>
          <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>Water Charges</label>
          <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}><option>Meter</option></ChoicesFormInput>
        </Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Other Charges" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Late Fee Rule" style={{ backgroundColor: '#F9F9FC' }}/></Col>
      </Row>
    </CardBody> */}
  </Card>
)}

{/* ================= WAREHOUSE ================= */}
{propertyType === 'warehouse' && (
  <Card className="mb-4">
    {/* <CardBody>
      <h4 className="fw-semibold">Rental & Financial Terms</h4>
      <hr />
      <Row className="g-3">
        <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Monthly Rent" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="security_deposit" label="Security Deposit" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="maintenance" label="Maintenance Charges" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}>
          <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>Electricity Charges</label>
          <ChoicesFormInput className="form-control"><option>Meter</option></ChoicesFormInput>
        </Col>
        <Col lg={4}>
          <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>Water Charges</label>
          <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}><option>Meter</option></ChoicesFormInput>
        </Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="CAM Charges" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Other Charges" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Rent Escalation %/Year" style={{ backgroundColor: '#F9F9FC' }}/></Col>
        <Col lg={4}><TextFormInput control={control} name="other_charges" label="Lock-in Period" style={{ backgroundColor: '#F9F9FC' }}/></Col>
      </Row>
    </CardBody> */}
  </Card>
)}

     { propertyType === 'warehouse' && (   <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Tenant & Usage Preference</h4>
          <hr />
          <label className="form-label">Landlord Name</label>
          <ChoicesFormInput className="form-control mb-3"style ={{ backgroundColor: '#F9F9FC' }}>
            <option>Select From Master</option>
          </ChoicesFormInput>

          <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>Allowed Industry Type</label>
          <Row className="g-3">
            {['FMCG','Pharma','Ecommerce','Manufacturing','Logistics'].map(t => (
              <Col lg={3} key={t}>
                <Form.Check label={t} />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>)}

      
          {propertyType === 'warehouse' && ( <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Availability & Status</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <label className="form-label">Status</label>
              <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                <option>Vacant</option>
                <option>Occupied</option>
              </ChoicesFormInput>
            </Col>
            <Col lg={4}><TextFormInput control={control} name="available_from" label="Available From" placeholder="dd-mm-yyyy" style={{ backgroundColor: '#F9F9FC' }}/></Col>
            <Col lg={4}><TextFormInput control={control} name="current_tenant" label="Current Tenant" style={{ backgroundColor: '#F9F9FC' }}/></Col>
          </Row>
        </CardBody>
      </Card>)}


      {propertyType === 'villa' && (
        <Card className="mb-4">
          <CardBody>
            <h4 className="fw-semibold">Facilities (Villa)</h4>
            <hr />
            <Row className="g-3">
              {[
                '24x7 Water Supply',
                'Power Backup',
                'Security / Guard',
                'CCTV',
                'Clubhouse Access',
                'Gym',
                'Children’s Play Area',
                'Internal Roads',
                'Street Lights',
                'Gated Community'
              ].map(item => (
                <Col lg={3} key={item}>
                  <Form.Check type="checkbox" label={item} />
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      )}

        { propertyType === 'villa' && (   <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Tenant Preference</h4>
          <hr />
          <label className="form-label">Rental Purpose</label>
          <ChoicesFormInput className="form-control mb-3" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F9F9FC' }}>
            <option>Residential</option>
            <option>Commercial</option>
          </ChoicesFormInput>

          <label className="form-label">Tenant Type Allowed</label>
          <Row className="g-3">
            {['Bachelor','Family','Company Staff','Labour'].map(t => (
              <Col lg={3} key={t}>
                <Form.Check label={t} />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>)}

      {propertyType === 'commercial' && (
        <Card className="mb-4">
          <CardBody>
            <h4 className="fw-semibold">Business & Tenant Preference</h4>
            <hr />
            <Row className="g-3">
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Landlord Name"style={{ backgroundColor: '#F9F9FC' }} /></Col>
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Allowed Business Type" style={{ backgroundColor: '#F9F9FC' }}/></Col>
              <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Prohibited Business" style={{ backgroundColor: '#F9F9FC' }}/></Col>    
              <Col lg={4}>
                <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>Lease Type</label>
                <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                  <option>Company Lease</option>
                  <option>No</option>
                </ChoicesFormInput>
              </Col>

           <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Lease Tenure Year" style ={{ backgroundColor: '#F9F9FC' }}/></Col>    
           <Col lg={4}><TextFormInput control={control} name="monthly_rent" label="Lock-in Period" style ={{ backgroundColor: '#F9F9FC' }}/></Col>    

            </Row>
          </CardBody>
        </Card>
      )}

          {propertyType === 'commercial' && ( <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Availability & Status</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <label className="form-label">Status</label>
              <ChoicesFormInput className="form-control">
                <option>Vacant</option>
                <option>Occupied</option>
              </ChoicesFormInput>
            </Col>
            <Col lg={4}><TextFormInput control={control} name="available_from" label="Available From" placeholder="dd-mm-yyyy" style={{ backgroundColor: '#F9F9FC' }}/></Col>
            <Col lg={4}><TextFormInput control={control} name="current_tenant" label="Current Tenant" style={{ backgroundColor: '#F9F9FC' }}/></Col>
          </Row>
        </CardBody>
      </Card>)}
      {/* ================= OWNERSHIP ================= */}
      
   {(propertyType === 'flat' || propertyType === 'villa') && (  
     <Card className="mb-2">
      <CardBody>
  <h4 className="fw-semibold">Tenants Details</h4>
  <hr />
  <Row className="g-3">
    <Col lg={4}>
      <label className="form-label">Tenants ID</label>
      <ChoicesFormInput className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option>Select Tenant</option>
      </ChoicesFormInput>
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="tenant_name" label="Tenant Name" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <label className="form-label">Tenant Type</label>
      <select
        className="form-control"
        style={{ backgroundColor: '#F9F9FC' }}
        value={tenantType}
        onChange={(e) => setTenantType(e.target.value)}
      >
        <option value="Individual">Individual</option>
        <option value="Company">Company</option>
      </select>
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="mobile_number" label="Mobile Number" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="email_address" label="Email Address" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="nationality" label="Nationality" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="civil_id" label="Civil ID / Passport Number" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    {/* ✅ Sirf Company select karne par dikhega */}
    {tenantType === 'Company' && (
      <Col lg={4}>
        <TextFormInput control={control} name="company_name" label="Company Name (If Corporate)" style={{ backgroundColor: '#F9F9FC' }} />
      </Col>
    )}
  </Row>
</CardBody>
      </Card>)}

      {propertyType === 'villa' && ( <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Availability & Status</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <label className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>Status</label>
              <ChoicesFormInput className="form-control"style ={{ backgroundColor: '#F9F9FC' }}>
                <option>Vacant</option>
                <option>Occupied</option>
              </ChoicesFormInput>
            </Col>
            <Col lg={4}><TextFormInput control={control} name="available_from" label="Available From" placeholder="dd-mm-yyyy" style={{ backgroundColor: '#F9F9FC' }}/></Col>
            <Col lg={4}><TextFormInput control={control} name="current_tenant" label="Current Tenant" style={{ backgroundColor: '#F9F9FC' }}/></Col>
          </Row>
        </CardBody>
      </Card>)}

      {/* ================= FACILITIES & AMENITIES ================= */}
   { propertyType === 'flat' && (
      <Card className="mb-4">
       <CardBody>
  <h4 className="fw-semibold">Rental Details</h4>
  <hr />
  <Row className="g-3">

    <Col lg={4}>
      <TextFormInput control={control} name="rental_start_date" label="Rental Start Date" placeholder="dd-mm-yyyy" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="rental_end_date" label="Rental End Date" placeholder="dd-mm-yyyy" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="agreement_duration" label="Agreement Duration (Months)" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="monthly_rent" label="Monthly Rent" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="security_deposit" label="Security Deposit" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="maintenance_charges" label="Maintenance Charges" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <label className="form-label">Advance Rent Paid</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </Col>

    <Col lg={4}>
      <label className="form-label">Payment Mode</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Cash">Cash</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Online">Online</option>
      </select>
    </Col>

  </Row>
</CardBody>
      </Card>)}

      {/* ================= TENANT PREFERENCE ================= */}
    {propertyType === 'flat' && (
  <Card className="mb-3">
  <CardBody>
  <h4 className="fw-semibold">Agreement Details</h4>
  <hr />
  <Row className="g-3">

    <Col lg={4}>
      <label className="form-label">Agreement Type</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Municipality Agreement">Municipality Agreement</option>
        <option value="Internal Agreement">Internal Agreement</option>
      </select>
    </Col>

    <Col lg={4}>
      <label className="form-label">Agreement Status</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Pending">Pending</option>
        <option value="Under Process">Under Process</option>
        <option value="Signed">Signed</option>
      </select>
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="agreement_prepared_by" label="Agreement Prepared By" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    {/* Agreement Document Upload */}
    <Col lg={12}>
      <label className="form-label">Agreement Document Upload</label>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        border: '1px solid #ced4da',
        borderRadius: '6px',
        backgroundColor: '#F9F9FC',
        width: 'fit-content'
      }}>
        <label style={{
          padding: '6px 14px',
          backgroundColor: '#e9ecef',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          color: '#444'
        }}>
          Choose File
          <input type="file" style={{ display: 'none' }} />
        </label>
        <span style={{ fontSize: '13px', color: '#888' }}>No File Chosen</span>
      </div>
    </Col>

  </Row>
</CardBody>
  </Card>
)}




      {/* ================= AVAILABILITY & STATUS ================= */}
     {propertyType === 'flat' && ( 
      <Card className="mb-4">
      <CardBody>
  <h4 className="fw-semibold">Key Management</h4>
  <hr />
  <Row className="g-3">

    <Col lg={4}>
      <label className="form-label">Key Available in Office</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="key_number" label="Key Number / Key Code" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="key_handover_date" label="Key Handover Date" placeholder="dd-mm-yyyy" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <label className="form-label">Key Handover Status</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Pending">Pending</option>
        <option value="Handover Completed">Handover Completed</option>
      </select>
    </Col>

  </Row>
</CardBody>
      </Card>)}

      {/* // Utility Details */}
        {propertyType === 'flat' && ( 
      <Card className="mb-4">
       <CardBody>
  <h4 className="fw-semibold">Utility Details</h4>
  <hr />
  <Row className="g-3">

    <Col lg={4}>
      <TextFormInput control={control} name="electricity_meter_number" label="Electricity Meter Number" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="electricity_meter_reading" label="Electricity Meter Reading (Start)" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="water_meter_reading" label="Water Meter Reading (Start)" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="gas_meter_reading" label="Gas Meter Reading (Start)" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

  </Row>
</CardBody>
      </Card>)}

      {/* Financial Approval */}
        {propertyType === 'flat' && ( 
      <Card className="mb-4">
       <CardBody>
  <h4 className="fw-semibold">Financial Approval</h4>
  <hr />
  <Row className="g-3">

    <Col lg={4}>
      <label className="form-label">Finance Approval Status</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </Col>

    <Col lg={4}>
      <label className="form-label">Rent Entry Created</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </Col>

    <Col lg={4}>
      <label className="form-label">Invoice Generated</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </Col>

  </Row>
</CardBody>
      </Card>)}

      {/* ================= Maintenace ================= */}
      <Card className="mb-4">
         {propertyType === 'flat' && ( 
      <Card className="mb-4">
      <CardBody>
  <h4 className="fw-semibold">Maintenance Check</h4>
  <hr />
  <Row className="g-3">

    <Col lg={4}>
      <label className="form-label">Maintenance Required</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </Col>

    <Col lg={4}>
      <TextFormInput control={control} name="maintenance_ticket_id" label="Maintenance Ticket ID" style={{ backgroundColor: '#F9F9FC' }} />
    </Col>

    <Col lg={4}>
      <label className="form-label">Maintenance Status</label>
      <select className="form-control" style={{ backgroundColor: '#F9F9FC' }}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </Col>

  </Row>
</CardBody>
      </Card>)}
      </Card>

      {/* ================= INTERNAL TRACKING ================= */}
      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Internal Tracking</h4>
          <hr />
          <TextAreaFormInput control={control} name="internal_notes" label="Internal Notes" style={{ backgroundColor: '#F9F9FC' }}/>
          <TextFormInput control={control} name="created_by" label="Tenant Special Requirements"style={{ backgroundColor: '#F9F9FC' }} />
        </CardBody>
      </Card>

      {/* ================= SYSTEM FIELDS ================= */}
      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">System Fields (Auto)</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}><TextFormInput control={control} name="created_time" label="Created Time" placeholder="Time Stamp" style={{ backgroundColor: '#F9F9FC' }}/></Col>
            <Col lg={4}><TextFormInput control={control} name="updated_by" label="Last Updated By" style={{ backgroundColor: '#F9F9FC' }}/></Col>
            <Col lg={4}><TextFormInput control={control} name="updated_time" label="Last Updated Time" style={{ backgroundColor: '#F9F9FC' }}/></Col>
          </Row>
        </CardBody>
      </Card>

      {/* ================= BUTTONS ================= */}
      <div className="mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-primary" type="submit" className="w-100">
              Cancel
            </Button>
          </Col>
          <Col lg={2}>
            <Button 
  variant="primary" 
  className="w-100"
  style={{ backgroundColor: '#5D7186', borderColor: '#5D7186' }}
>
  Add Property
</Button>
          </Col>
        </Row>
      </div>

    </form>
  );
};

export default PropertyAdd;