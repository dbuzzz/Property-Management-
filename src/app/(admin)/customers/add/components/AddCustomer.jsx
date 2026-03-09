import ChoicesFormInput from '@/components/from/ChoicesFormInput';
import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';  
import { useEffect } from 'react';
import Choices from 'choices.js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'choices.js/public/assets/styles/choices.min.css';


import * as yup from 'yup';
const Addlead = () => {
  
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
  
  

const [step, setStep] = useState('main'); // main | tenant | landlord
const [leadValue, setLeadValue] = useState('');

const [leadSubType, setLeadSubType] = useState('');
   const [leadType, setLeadType] = useState('');
  const messageSchema = yup.object({
    name: yup.string().required('Please enter name'),
    description: yup.string().required('Please enter description'),
    zipCode: yup.string().required('Please enter Zip-Code'),
    email: yup.string().email().required('Please enter email'),
    number: yup.string().required('Please enter number'),
    propertiesNumber: yup.string().required('Please enter Properties Number'),
    facebookUrl: yup.string().required('Please enter Facebook Url'),
    instagramUrl: yup.string().required('Please enter Instagram Url'),
    twitterUrl: yup.string().required('Please enter Twitter Url'),
    viewProperties: yup.string().required('Please enter view properties'),
    ownProperties: yup.string().required('Please enter own Properties')
  });
  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(messageSchema)
  });
  
  // Add CSS for dropdown spacing and emoji rendering
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .choices__list--dropdown .choices__item {
        padding-left: 16px !important;
      }
      .choices__list--dropdown {
        padding-left: 8px !important;
      }
      .choices__list--dropdown .choices__item,
      .choices__inner,
      select.form-control {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif !important;
      }
      
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
  
  return <form onSubmit={handleSubmit(() => {})}>
    
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Add Lead Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="First name" placeholder="Enter You first name" label="First Name"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="last name" placeholder="Enter you last name" label="Last Name"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
                        {/* ✅ CONTACT NUMBER WITH COUNTRY CODE */}
          <Col lg={6}>
  <div className="mb-3">
    <label className="form-label">Contact Number</label>

    <PhoneInput
      country="om"
      value={phone}
      onChange={setPhone}
      inputStyle={{
        width: '100%',
        backgroundColor: '#F9F9FC'
      }}
    />
  </div>
</Col>

             <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="viewProperties"  placeholder="Enter Nationality" label="Nationality"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
          
             <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="Passport id" placeholder="Enter Detail" label="Passport ID/ Number"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
           
<Col lg={6}>
  <div className="mb-2">
    
    <label className="form-label" style ={{ backgroundColor: '#F9F9FC' }}>Lead Types</label>

    <select
      className="form-control lead-select"
      style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }}
      
      value={leadValue}
      onChange={(e) => {
        const value = e.target.value;

        if (value === 'tenant') {
          setStep('tenant');
          setLeadValue('');
        } else if (value === 'landlord') {
          setStep('landlord');
          setLeadValue('');
        } else {
          setLeadValue(value);
        }
      }}
    >
      {step === 'main' && (
        <>
          <option value="">Select Lead Type</option>
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </>
      )}

      {step === 'tenant' && (
        <>
          <option value="">Select Tenant Type</option>
          <option value="family">Family</option>
          <option value="company_staff">Company Staff</option>
          <option value="bachelor">Bachelor</option>
          <option value="labour">Labour</option>
        </>
      )}

      {step === 'landlord' && (
        <>
          <option value="">Select Landlord Type</option>
          <option value="owner">Owner</option>
          <option value="personal">Agent</option>
        </>
      )}
    </select>
  </div>
</Col>
            <Col lg={12}>
              <div className="mb-3">
                <TextAreaFormInput control={control} name="description" type="text" label="Lead  Address" className="Lead -address" id="schedule-textarea" rows={3} placeholder="Address"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="PO BOX"  placeholder="PO BOX" label="PO BOX" style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }}/>
              </div>
            </Col>
             <Col lg={4}>
  <div className="mb-3">
    <label htmlFor="choices-country" className="form-label"style ={{ backgroundColor: '#F9F9FC' }}>
      Country
    </label>

    <div className="custom-country-dropdown">
      <div 
        className="country-select-box" style ={{ backgroundColor: '#F9F9FC' }}
        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F9F9FC' }}>
          <img 
            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
            alt={selectedCountry.name}
            className="country-flag"
          />
          <span className="country-name">{selectedCountry.name}</span>
        </div>
        <span className="dropdown-arrow">▼</span>
      </div>
      
      {showCountryDropdown && (
        <div className="country-dropdown-list">
          {countries.map((country) => (
            <div
              key={country.code}
              className="country-dropdown-item"
              onClick={() => {
                setSelectedCountry(country);
                setShowCountryDropdown(false);
              }}
            >
              <img 
                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                alt={country.name}
                className="country-flag"
              />
              <span className="country-name">{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</Col>

            <Col lg={4}>
              <div className="mb-3">
                <label htmlFor="choices-city" className="form-label">
                  City
                </label>
                <ChoicesFormInput className="form-control" id="choices-city" data-placeholder=" City"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }}>
                <option value="">Choose a City</option>
                  <optgroup label="UK">
                    <option value="London">London</option>
                    <option value="Manchester">Manchester</option>
                    <option value="Liverpool">Liverpool</option>
                  </optgroup>
                  <optgroup label="FR">
                    <option value="Paris">Paris</option>
                    <option value="Lyon">Lyon</option>
                    <option value="Marseille">Marseille</option>
                  </optgroup>
                  <optgroup label="DE" disabled>
                    <option value="Hamburg">Hamburg</option>
                    <option value="Munich">Munich</option>
                    <option value="Berlin">Berlin</option>
                  </optgroup>
                  <optgroup label="US">
                    <option value="New York">New York</option>
                    <option value="Washington" disabled>
                      Washington
                    </option>
                    <option value="Michigan">Michigan</option>
                  </optgroup>
                  <optgroup label="SP">
                    <option value="Madrid">Madrid</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Malaga">Malaga</option>
                  </optgroup>
                  <optgroup label="CA">
                    <option value="Montreal">Montreal</option>
                    <option value="Toronto">Toronto</option>
                    <option value="Vancouver">Vancouver</option>
                  </optgroup>
                </ChoicesFormInput>
              </div>
            </Col>
           
       <Col lg={4}>
  <label className="form-label mb-1"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          
        }}>Lead Origin</label>
  
  {/* Add style tag */}
  
  
  <ChoicesFormInput
    className="form-control lead-origin-dropdown"
    style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }}
  >
    <option>Lead-Origin</option>
    <option>Open Sooq</option>
    <option>OLX</option>
    <option>Employee Referral</option>
    <option>Reference</option>
    <option>Website Inquiry</option>
    <option>Social Media</option>
    <option>Walk-in Customer</option>
    <option>Phone Call Inquiry</option>
    <option>Office Visit</option>
    <option>Online Property Portal</option>
    <option>Printing Banner</option>
  </ChoicesFormInput>
</Col>



            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="Created At" placeholder="Time-Lapse" label="Created At" style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }}/>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="Updated At" placeholder="Time-Lapse" label="Updated At"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
            <Col lg={4}>
                          <label className="form-label">Status</label>
                          <ChoicesFormInput className="form-control">
                            <option>Choose Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            
                          </ChoicesFormInput>
                        </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="Assigned to" placeholder="Lead Assigned To" label="Lead Assigned To"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
             <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="Comments" placeholder="Enter Comments" label=" Comments"style={{
          backgroundColor: '#F9F9FC',
          fontWeight: '600',
          border: '1.5px solid #c6c6c6'
        }} />
              </div>
            </Col>
            
          </Row>
        </CardBody>
      </Card>
      <div className="mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-primary" type="submit" className="w-100">
              Create Lead
            </Button>
          </Col>
          <Col lg={2}>
            <Button 
  variant="primary" 
  className="w-100"
  style={{ backgroundColor: '#5D7186', borderColor: '#5D7186' }}
>
  Cancel
</Button>
          </Col>
        </Row>
      </div>
    </form>;
};
export default Addlead;