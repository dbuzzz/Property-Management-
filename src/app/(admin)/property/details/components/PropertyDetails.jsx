import properties11 from '@/assets/images/properties/p-11.jpg';
import properties12 from '@/assets/images/properties/p-2.jpg';
import properties13 from '@/assets/images/properties/p-3.jpg';
import properties14 from '@/assets/images/properties/p-4.jpg';
import properties15 from '@/assets/images/properties/p-5.jpg';
import avatar from '@/assets/images/users/avatar-1.jpg';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getPropertyPhotos } from '@/utils/imageStorage';
import { currency } from '@/context/constants';
import {
  Button, 
  Card, 
  CardBody, 
  Col, 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle, 
  Row,
  Carousel  // ✅ YE ADD KARO
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

const formatDate = (val) => {
  if (val == null || val === '') return '—';
  const date = typeof val === 'string' ? new Date(val) : val;
  if (Number.isNaN(date?.getTime())) return String(val);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const PropertyDetails = ({ property }) => {
  const d = property || {};
  const pd = d.propertyDetails || {};
  const fd = d.flatData || {};
  const vd = d.villaData || {};

  const configuration = fd.flat_configuration || vd.villa_configuration || '';
  const bhkMatch = useMemo(() => configuration.match(/(\d+)\s*BHK/i), [configuration]);
  const bhk = bhkMatch ? bhkMatch[1] : '';

  const monthlyRent = pd.monthly_rent ?? d.expectedRent;
  const securityDeposit = pd.security_deposit ?? d.advanceAmountRent;
  const maintenance = pd.maintenance ?? pd.maintenance_charges;
  const electricity = pd.electricity ?? pd.electricity_type;
  const waterCharges = pd.water_charges ?? pd.water_included;

  const landlordName =
    pd.landlord_name || pd.landlordName || d.createdBy?.name || '—';
  const statusLabel = d.isActive === false ? 'Not Active' : 'Vacant';

  const fullAddress = [
    pd.address_line_1,
    pd.city,
    pd.state,
    pd.country,
    pd.pin_code || pd.zip_code,
  ]
    .filter(Boolean)
    .join(', ');
  const addressLine = pd.address_line_1 || fullAddress || '—';
  const city = pd.city || '—';
  const state = pd.state || '—';
  const poBox = pd.pin_code || pd.zip_code || pd.po_box || '—';

  const propertyTitle =
    d.buildingDetails || pd.building_name || vd.villa_name || 'Property';
  const propertyCode = pd.property_code || pd.propertyCode || d.propertyId;

  const carpetArea = pd.carpet_area_sqft;
  const builtupArea = pd.builtup_area_sqft || pd.super_builtup_area_sqft;
  const plotArea = d.dimensionAreaSqft || pd.plot_area_sqft;

  const bedrooms = bhk || fd.no_of_bedrooms || vd.number_of_bedrooms;
  const bathrooms = fd.no_of_bathrooms || vd.number_of_bathrooms;

  const rentalPurpose = d.rentalFor || pd.rental_purpose || pd.rental_purpose_type || '—';
  const tenantType = pd.tenant_type || pd.tenant_preference || '—';
  const petsAllowed = pd.pets_allowed != null ? (pd.pets_allowed ? 'Yes' : 'No') : '—';

  const amenitiesRaw = pd.amenities || fd.amenities || vd.amenities || pd.facilities;
  const amenitiesList = useMemo(() => {
    if (Array.isArray(amenitiesRaw)) return amenitiesRaw.filter(Boolean);
    if (typeof amenitiesRaw === 'string') return amenitiesRaw.split(/[,;|]/).map((s) => s.trim()).filter(Boolean);
    return [];
  }, [amenitiesRaw]);
  const defaultAmenities = ['Parking', 'Private Garden', 'Swimming Pool', 'Power Backup', 'CCTV', 'Gated Community'];
  const displayAmenities = amenitiesList.length > 0 ? amenitiesList : defaultAmenities;

  const propertyId = d.propertyId ?? d.property_id;
  const localPhotos = useMemo(() => (propertyId ? getPropertyPhotos(propertyId) : []), [propertyId]);
  const apiPhotos = d.photos && Array.isArray(d.photos) ? d.photos : [];
  const photoUrls = useMemo(() => {
    const combined = localPhotos.length > 0 ? localPhotos : apiPhotos;
    const fallbacks = [properties11, properties12, properties13, properties14];
    return [combined[0] || fallbacks[0], combined[1] || fallbacks[1], combined[2] || fallbacks[2], combined[3] || fallbacks[3]];
  }, [localPhotos, apiPhotos]);

  const createdByName = d.createdBy?.name || '—';
  const createdAtStr = formatDate(d.createdAt);
  const updatedAtStr = formatDate(d.updatedAt);
  const facing = pd.facing || '—';

  const properties = [
    {
      code: 'March 2026',
      name: 'OMR 8,500',
      type: 'UPI',
      location: '01 Mar 2026',
      status: 'Paid'
    },
    {
      code: 'February 2026',
      name: 'OMR 8,500',
      type: 'BANK NEFT',
      location: '1 Feb 2026',
      status: 'Paid'
    }
  ];

  return (
    <div style={{ 
      backgroundColor: '#F9F9FC',
      minHeight: '100vh',
      padding: ''
    }}>
      {/* Image Carousel Section */}
      

      {/* Grid Images Section - CAROUSEL KE NICHE */}
      <Row className="g-0" >
        <Col xl={12} lg={6}>
          <Card>
            <CardBody>
              <div className="position-relative">
                <div className="row g-2">
                  {photoUrls.map((src, idx) => (
                    <div className="col-6" key={idx}>
                      <img
                        src={src}
                        alt={`property ${idx + 1}`}
                        className="img-fluid rounded w-100"
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Profile Section */}
      <div style={{ 
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0',
        marginTop: '0rem'
      }}>
        {/* Header Section */}
       {/* Profile Section */}
<div style={{ 
  maxWidth: '100%',
  margin: '0 auto',
  padding: '0',
  marginTop: '0rem'
}}>
  {/* Header Section */}
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    marginBottom: '1.5rem',
    paddingLeft: '0rem',
    paddingRight: '1rem'
  }}>
    {/* Left Side - Property Name & Address */}
    <div>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 550, 
        marginBottom: '0.25rem',
        color: '#000'
      }}>
        {propertyTitle}
      </h2>
      <p style={{ 
        margin: 0, 
        color: 'black',
        fontSize: '1rem',
        fontWeight: 400
      }}>
        {fullAddress || '—'}
      </p>
    </div>

    {/* Right Side - Price */}
    <div style={{
      textAlign: 'right'
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 550, 
        marginBottom: '0.25rem',
        color: '#000'
      }}>
        {monthlyRent ? `OMR ${monthlyRent}` : '—'}
      </h2>
      <p style={{ 
        margin: 0, 
        color: 'black',
        fontSize: '1rem',
        fontWeight: 400
      }}>
        per month + maintenance
      </p>
    </div>
  </div>
  </div>

        {/* Basic Profile Card */}
        <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Basic Property Information
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              <Row>
                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
              PROPERTY TYPE
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {vd.villa_type || pd.property_type || d.rentalType || '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      PROPERTY CODE
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {propertyCode || '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      PROJECT/SOCIETY
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {pd.project_name || pd.society || '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      VILLA NAME/NO
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {vd.villa_name || pd.building_name || '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      TOTAL FLOORS
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {d.floor || fd.total_floors || '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      YEAR BUILT
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {pd.year_built || '—'}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>

        {/* KYC & Identity Card */}
         {/* Basic Profile Card */}
        <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Configuration & Area
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              <Row>
                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
                      BHK
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {bedrooms || '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      CARPET AREA
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {carpetArea ? `${carpetArea} sq.ft` : '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      BUILT-UP-AREA
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {builtupArea ? `${builtupArea} sq.ft` : '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      PLOT AREA
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {plotArea ? `${plotArea} sq.ft` : '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      BATHROOMS
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {bathrooms || '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      FACING
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {facing}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>

        {/* Property Linked Card */}
        <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Rental & Financial Details
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              <Row>
                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
                      MONTHLY RENT
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {monthlyRent != null ? `OMR ${monthlyRent}` : '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                     SECURITY DEPOSIT
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {securityDeposit != null ? `OMR ${securityDeposit}` : '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      MAINTENANCE
                    </p>
                    <p style={{ 
                      fontSize: '0.999rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {maintenance != null ? (typeof maintenance === 'number' ? `OMR ${maintenance}` : maintenance) : '—'}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      ELICTRICITY
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {electricity || '—'}
                    </p>
                  </div>
                </Col>
                 <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                     WATER CHARGES 
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {waterCharges != null ? String(waterCharges) : '—'}
                    </p>
                  </div>
                </Col>

              </Row>
            </div>
          </CardBody>
        </Card>

        {/* Lease & Contact Card */}
         {/* Basic Profile Card */}
        <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Ownership 
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              <Row>
                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
                      LANDLORD NAME
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {landlordName}
                    </p>
                  </div>
                </Col>

                

                

               

               

              
              </Row>
            </div>
          </CardBody>
        </Card>
        
        {/* Rent & Financials Card */}
         <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Amenities & Facilities
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              <Row>
                {displayAmenities.map((amenity, index) => (
                  <Col lg={2} md={4} sm={6} key={index}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 500, color: 'black', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.8px', backgroundColor: '#f3f4f6', padding: '12px 12px', borderRadius: '6px' }}>
                        {amenity}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </CardBody>
        </Card>

       

        {/* Preferences & Rules Card */}
        <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Tenant Preference
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              <Row>
                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
                      RENTAL PURPOSE 
                    </p>
                      <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {rentalPurpose}
                    </p>
                  </div>
                </Col>

                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      TENANT TYPE
                    </p>
                      <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {tenantType}
                    </p>
                  </div>
                </Col>

                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      PETS ALLOWED
                    </p>
                      <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {petsAllowed}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>

        {/* System Information Card */}
        <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Availability & Status
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              <Row>
                <Col lg={2} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
                     STATUS
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {statusLabel}
                    </p>
                  </div>
                </Col>

                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      AVAILABLE FORM
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      15 Mar 2026
                    </p>
                  </div>
                </Col>
             
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      CURRENT TENANT
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      ---
                    </p>
                  </div>
                </Col>
                  </Row>
            </div>
          </CardBody>
        </Card>
                
     <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Residential Address
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              {/* Address */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ 
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'black',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  ADDRESS
                </p>
                <p style={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#000',
                  margin: 0
                }}>
                  {addressLine}
                </p>
              </div>

              <Row>
                {/* City */}
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      CITY
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {city}
                    </p>
                  </div>
                </Col>

                {/* State */}
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      STATE
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {state}
                    </p>
                  </div>
                </Col>

                {/* PO Box */}
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      PO BOX
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {poBox}
                    </p>
                  </div>
                </Col>

                {/* Google Map */}
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      GOOGLE MAP
                    </p>
                    <a 
                      href="#" 
                      style={{ 
                        fontSize: '0.938rem',
                        fontWeight: 600,
                        color: 'black',
                        textDecoration: 'none',
                        margin: 0
                      }}
                    >
                      View Location
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card> 
               <Card style={{ 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          marginLeft: '0rem',
          marginRight: '0rem'
        }}>
          <CardBody style={{ padding: '2rem 2.5rem' }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              System Information
            </h4>
            
            <div style={{ 
              borderTop: '1px solid #dee2e6',
              paddingTop: '1.75rem'
            }}>
              {/* Address */}
            
              <Row>
                {/* City */}
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      CREATED BY
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {createdByName}
                    </p>
                  </div>
                </Col>

                {/* State */}
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      CREATED ON
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {createdAtStr}
                    </p>
                  </div>
                </Col>

                {/* PO Box */}
                <Col lg={3} md={4} sm={6}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'black',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      LAST UPDATED
                    </p>
                    <p style={{ 
                      fontSize: '0.938rem',
                      fontWeight: 600,
                      color: '#000',
                      margin: 0
                    }}>
                      {updatedAtStr}
                    </p>
                  </div>
                </Col>

                {/* Google Map */}
               
              </Row>
            </div>
          </CardBody>
        </Card>
        </div>

      {/* Original AgentDetailsCard Component */}
      {/* <AgentDetailsCard /> */}
    </div>
  );
};
             

export default PropertyDetails;