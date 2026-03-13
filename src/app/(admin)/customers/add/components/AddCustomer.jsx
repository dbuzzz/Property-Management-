import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import { API_BASE_URL, AUTH_TOKEN } from '@/constants/api';
import httpClient from '@/helpers/httpClient';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as yup from 'yup';

// Fallback select wrapper to keep existing JSX working
const ChoicesFormInput = (props) => <select {...props} />;

const TENANT_PURPOSES = ['tenant', 'family', 'company_staff', 'bachelor', 'labour'];
const LANDLORD_PURPOSES = ['landlord', 'owner', 'personal'];

function formatDisplayDate(value) {
  if (!value) return '';
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(value);
  }
}

function getDefaultValuesFromLead(lead) {
  if (!lead) return undefined;
  const purpose = String(lead.purpose || '').toLowerCase();
  const isTenant = TENANT_PURPOSES.includes(purpose);
  const isLandlord = LANDLORD_PURPOSES.includes(purpose);
  const step = isTenant ? 'tenant' : isLandlord ? 'landlord' : 'main';
  const leadValue = purpose && purpose !== 'tenant' && purpose !== 'landlord' ? purpose : '';
  return {
    first_name: lead.firstName ?? lead.first_name ?? '',
    last_name: lead.lastName ?? lead.last_name ?? '',
    description: lead.address ?? '',
    nationality: lead.nationality ?? '',
    number: lead.phone_number ?? lead.phoneNumber ?? '',
    lead_origin: lead.leadOrigin ?? lead.lead_origin ?? 'website',
    passport_id: lead.passportOrId ?? lead.passport_or_id ?? '',
    created_at: formatDisplayDate(lead.createdAt ?? lead.created_at ?? ''),
    updated_at: formatDisplayDate(lead.updatedAt ?? lead.updated_at ?? ''),
    lead_assign_to_user_id: String(lead.leadAssignTo?.userId ?? lead.lead_assign_to_id ?? ''),
    country: lead.country ?? '',
    city: lead.city ?? '',
    status: lead.isActive === true ? 'Active' : lead.isActive === false ? 'Inactive' : 'Active',
    po_box: lead.poBox ?? lead.po_box ?? '',
    comments: lead.comments ?? '',
    _step: step,
    _leadValue: leadValue,
  };
}

const Addlead = ({ onFormValuesChange, initialData = null, mode = 'create' }) => {
  const isUpdate = mode === 'update';
  const defaults = getDefaultValuesFromLead(initialData);

  const [phone, setPhone] = useState(() =>
    initialData ? (initialData.phone_number ?? initialData.phoneNumber ?? '') : ''
  );
  const [step, setStep] = useState(defaults?._step ?? 'main');
  const [leadValue, setLeadValue] = useState(defaults?._leadValue ?? '');

  // Fallback state for old country dropdown to avoid runtime reference errors
  const [selectedCountry, setSelectedCountry] = useState({ code: 'OM', name: 'Oman' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countries = [];

  const messageSchema = yup.object({
    first_name: yup.string().required('Please enter first name'),
    last_name: yup.string().required('Please enter last name'),
    description: yup.string().required('Please enter address'),
    lead_assign_to_user_id: yup.string().required('Please enter Lead Assigned To (user ID)'),
    lead_origin: yup.string(),
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(messageSchema),
    defaultValues: defaults
      ? {
          first_name: defaults.first_name,
          last_name: defaults.last_name,
          description: defaults.description,
          nationality: defaults.nationality,
          number: defaults.number,
          lead_origin: defaults.lead_origin,
          passport_id: defaults.passport_id,
          lead_assign_to_user_id: defaults.lead_assign_to_user_id,
          'Created At': defaults.created_at,
          'Updated At': defaults.updated_at,
          country: defaults.country,
          city: defaults.city,
          status: defaults.status,
          'PO BOX': defaults.po_box,
          Comments: defaults.comments,
        }
      : {
          country: '',
          city: '',
          status: 'Active',
          'PO BOX': '',
          Comments: '',
        },
  });

  useEffect(() => {
    if (!initialData) return;
    const d = getDefaultValuesFromLead(initialData);
    if (!d) return;
    reset({
      first_name: d.first_name,
      last_name: d.last_name,
      description: d.description,
      nationality: d.nationality,
      number: d.number,
      lead_origin: d.lead_origin,
      passport_id: d.passport_id,
      lead_assign_to_user_id: d.lead_assign_to_user_id,
      'Created At': d.created_at,
      'Updated At': d.updated_at,
      country: d.country,
      city: d.city,
      status: d.status,
      'PO BOX': d.po_box,
      Comments: d.comments,
    });
    setStep(d._step);
    setLeadValue(d._leadValue);
    setPhone(initialData.phone_number ?? initialData.phoneNumber ?? '');
  }, [initialData, reset]);

  const watched = watch();

  useEffect(() => {
    const leadType =
      step === 'tenant'
        ? (leadValue ? leadValue.charAt(0).toUpperCase() + leadValue.slice(1).replace('_', ' ') : 'Tenant')
        : step === 'landlord'
          ? (leadValue ? leadValue.charAt(0).toUpperCase() + leadValue.slice(1) : 'Landlord')
          : '';
    if (typeof onFormValuesChange === 'function') {
      onFormValuesChange({
        first_name: watched.first_name,
        last_name: watched.last_name,
        description: watched.description,
        phone,
        email: watched.email,
        leadType,
        leadId: watched.leadId,
        status: watched.status || 'Available',
        createdAt: watched['Created At'],
        updatedAt: watched['Updated At'],
      });
    }
  }, [watched, phone, step, leadValue, onFormValuesChange]);

  const purposeValue =
    step === 'tenant' ? (leadValue || 'tenant') : step === 'landlord' ? (leadValue || 'landlord') : '';

  const onSubmit = handleSubmit(async values => {
    try {
      if (!purposeValue) {
        alert('Please select Lead Type (Tenant or Landlord and then the sub-type).');
        return;
      }
      const assignToUserId = Number(values.lead_assign_to_user_id);
      if (!Number.isInteger(assignToUserId) || assignToUserId < 1) {
        alert('Please enter a valid user ID for Lead Assigned To (e.g. 36).');
        return;
      }
      const countryId = initialData?.country?.country_id ?? initialData?.countryId ?? 2;
      const cityId = initialData?.city?.city_id ?? initialData?.cityId ?? 1;
      const nationalityId = initialData?.nationality?.nationality_id ?? initialData?.nationalityId ?? 3;

      if (isUpdate && initialData) {
        const updatePayload = {
          lead_id: initialData.leadId ?? initialData.lead_id,
          lead_assign_to: { user_id: assignToUserId },
          first_name: values.first_name,
          last_name: values.last_name,
          lead_origin: values.lead_origin || 'website',
          address: values.description ?? '',
          country: { country_id: countryId },
          city: { city_id: cityId },
          nationality: { nationality_id: nationalityId },
          passport_or_id: values.passport_id ?? '',
          purpose: purposeValue,
          permissions: { property: true },
        };
        await httpClient.put(`${API_BASE_URL}/lead/update/`, updatePayload, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        alert('Lead updated successfully.');
        return;
      }

      const payload = {
        lead_assign_to: { user_id: assignToUserId },
        first_name: values.first_name,
        last_name: values.last_name,
        lead_origin: values.lead_origin || 'website',
        phone_number: phone,
        address: values.description,
        country: { country_id: 2 },
        city: { city_id: 1 },
        nationality: { nationality_id: 3 },
        passport_or_id: values.passport_id ?? '',
        purpose: purposeValue,
        permissions: { property: true, lead: true },
      };

      await httpClient.post(`${API_BASE_URL}/lead/create/`, payload, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Lead created successfully.');
    } catch (e) {
      console.error(isUpdate ? 'Failed to update lead' : 'Failed to create lead', e);
      alert(isUpdate ? 'Failed to update lead. Please try again.' : 'Failed to create lead. Please try again.');
    }
  });

  return <form onSubmit={onSubmit}>
    
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Add Lead Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="first_name" placeholder="Enter you first name" label="First Name" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="last_name" placeholder="Enter you last name" label="Last Name" />
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
                <TextFormInput control={control} name="nationality" placeholder="Enter Nationality" label="Nationality" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="passport_id" placeholder="Enter Detail" label="Passport ID/ Number" />
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
                <TextFormInput
                  control={control}
                  name="Created At"
                  placeholder="Time-Lapse"
                  label="Created At"
                  readOnly
                  style={{
                    backgroundColor: '#F9F9FC',
                    fontWeight: '600',
                    border: '1.5px solid #c6c6c6',
                  }}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="Updated At"
                  placeholder="Time-Lapse"
                  label="Updated At"
                  readOnly
                  style={{
                    backgroundColor: '#F9F9FC',
                    fontWeight: '600',
                    border: '1.5px solid #c6c6c6',
                  }}
                />
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
                <TextFormInput
                  control={control}
                  name="lead_assign_to_user_id"
                  placeholder="e.g. 36"
                  label="Lead Assigned To (User ID)"
                  style={{
                    backgroundColor: '#F9F9FC',
                    fontWeight: '600',
                    border: '1.5px solid #c6c6c6',
                  }}
                />
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