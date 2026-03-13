import ChoicesFormInput from '@/components/from/ChoicesFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import { API_BASE_URL, AUTH_TOKEN } from '@/constants/api';
import httpClient from '@/helpers/httpClient';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody, Col, Row, Form, Button } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as yup from 'yup';

const schema = yup.object({
  landlord_id: yup
    .number()
    .typeError('Enter a valid Landlord ID')
    .required('Landlord ID is required')
    .min(1, 'Landlord ID must be at least 1')
    .integer(),
});

const toNum = (v) => {
  if (v === '' || v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const toStr = (v) => (v == null ? '' : String(v));

function toApiDate(value) {
  const s = toStr(value).trim();
  if (!s) return null;
  const parts = s.split(/[-/.]/).map((p) => parseInt(p, 10));
  if (parts.length === 3 && parts.every(Number.isFinite)) {
    const [a, b, c] = parts;
    if (a > 31)
      return `${String(a).padStart(4, '0')}-${String(b).padStart(2, '0')}-${String(
        c
      ).padStart(2, '0')}`;
    const y = c > 99 ? c : c < 50 ? 2000 + c : 1900 + c;
    return `${String(y).padStart(4, '0')}-${String(b).padStart(2, '0')}-${String(
      a
    ).padStart(2, '0')}`;
  }
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return null;
}

const FLAT_CONFIG_MAP = {
  Studio: 'Studio',
  '1 BHK': '1BHK',
  '2 BHK': '2BHK',
  '3 BHK': '3BHK',
  '1BHK': '1BHK',
  '2BHK': '2BHK',
  '3BHK': '3BHK',
};

const NUMERIC_KEYS = new Set([
  'user_id',
  'landlord_id',
  'created_by_id',
  'current_tenant_id',
  'agreement_id',
  'year_of_construction',
  'flat_number',
  'floor_number',
  'total_floors',
  'no_of_bathrooms',
  'no_of_cabins',
  'no_of_washrooms',
  'number_of_bedrooms',
  'number_of_bathrooms',
  'living_rooms_count',
  'lease_tenure_years',
  'lock_in_period_months',
  'security_deposit_months',
  'advance_amount_rent',
]);

function sanitizePayload(obj) {
  if (obj === null || obj === undefined) return undefined;
  if (Array.isArray(obj)) return obj.map((item) => sanitizePayload(item));
  if (typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v === null || v === undefined) {
        out[k] = NUMERIC_KEYS.has(k) ? 0 : '';
      } else {
        out[k] = sanitizePayload(v);
      }
    }
    return out;
  }
  return obj;
}

function getDefaultsFromProperty(prop) {
  if (!prop) return undefined;
  const pd = prop.propertyDetails ?? {};
  const fd = prop.flatData ?? {};
  const type = (prop.rentalType || 'Flat').toLowerCase();
  return {
    property_type: type === 'villa' ? 'villa' : 'flat',
    building_name: pd.building_name || prop.buildingDetails || '',
    building_block: fd.building_block || '',
    floor_number: prop.floor || fd.floor_number || '',
    flat_no: prop.flatNumber || fd.flat_number || '',
    total_floors: pd.total_floors || '',
    carpet_area: pd.carpet_area_sqft || prop.dimensionAreaSqft || '',
    builtup_area: pd.builtup_area_sqft || '',
    monthly_rent: pd.monthly_rent || prop.expectedRent || '',
    security_deposit: pd.security_deposit_amount || '',
    electricity_type: pd.electricity_charge_type || 'Meter',
    water_type: pd.water_charge_type || 'Meter',
    late_fee: pd.late_fee_type === 'Percentage' ? 'Yes' : 'No',
    status: pd.current_status || 'Vacant',
    address1: pd.address_line_1 || '',
    address2: pd.address_line_2 || '',
    area: pd.area_zone || '',
    city: pd.city || '',
    state: pd.state || '',
    country: pd.country || '',
    po_box: pd.pincode || '',
    map_url: pd.google_map_location || '',
    other_charges: pd.other_charges || '',
    available_from: pd.available_from || '',
    current_tenant: pd.current_tenant_id || '',
    internal_notes: pd.internal_notes || '',
    configuration: fd.flat_configuration || 'Studio',
    bathrooms: fd.no_of_bathrooms || '',
    kitchen_type: fd.kitchen_type || 'Open',
    facing: fd.facing || 'East',
    balcony: fd.balcony ? 'Yes' : 'No',
  };
}

const PropertyAdd = ({ initialData = null, mode = 'create', onFormValuesChange }) => {
  const isUpdate = mode === 'update';
  const defaults = getDefaultsFromProperty(initialData);

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues:
      defaults || {
        property_type: 'flat',
        building_name: '',
        configuration: 'Studio',
        balcony: 'No',
        kitchen_type: 'Open',
        store_room: 'No',
        facing: 'East',
        electricity_type: 'Meter',
        water_type: 'Meter',
        late_fee: 'No',
        rental_purpose: 'Residential',
        status: 'Vacant',
        landlord_id: '',
        assigned_to_user_id: 36,
      },
  });

  const watched = watch();

  useEffect(() => {
    if (typeof onFormValuesChange !== 'function') return;
    const buildingName = watched.building_name || defaults?.building_name || '';
    const address = watched.address1 || defaults?.address1 || '';
    const city = watched.city || defaults?.city || '';
    const country = watched.country || defaults?.country || '';
    const fullAddress = [address, city, country].filter(Boolean).join(', ');
    const price = watched.monthly_rent || defaults?.monthly_rent || '';
    const beds = (watched.configuration || defaults?.configuration || '')
      .replace(/[^0-9]/g, '') || '';
    const baths = watched.bathrooms || defaults?.bathrooms || '';
    const area = watched.carpet_area || defaults?.carpet_area || '';
    const floor = watched.floor_number || defaults?.floor_number || '';
    const status = watched.status || defaults?.status || 'For Rent';

    onFormValuesChange({
      building_name: buildingName,
      name: buildingName,
      address: fullAddress,
      price,
      beds,
      baths,
      area,
      floor,
      status,
    });
  }, [watched, defaults, onFormValuesChange]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const assignedUserId = toNum(values.assigned_to_user_id) || 36;
      const propertyType = values.property_type || 'flat';
      const rentalType =
        propertyType === 'villa'
          ? 'Villa'
          : propertyType === 'office'
            ? 'Commercial'
            : 'Flat';

      const landlordId = toNum(values.landlord_id);
      const property_details = {
        building_name: toStr(values.building_name),
        total_floors: toNum(values.total_floors),
        carpet_area_sqft: toStr(values.carpet_area),
        builtup_area_sqft: toStr(values.builtup_area),
        monthly_rent: toStr(values.monthly_rent),
        security_deposit_amount: toStr(values.security_deposit),
        electricity_charge_type: toStr(values.electricity_type),
        water_charge_type: toStr(values.water_type),
        late_fee_type: values.late_fee === 'Yes' ? 'Percentage' : 'Fixed',
        late_fee_value: values.late_fee === 'Yes' ? '0' : '0',
        current_status: toStr(values.status),
        landlord_id: landlordId,
        created_by_id: assignedUserId,
        address_line_1: toStr(values.address1),
        address_line_2: toStr(values.address2),
        area_zone: toStr(values.area),
        city: toStr(values.city),
        state: toStr(values.state),
        country: toStr(values.country),
        pincode: toStr(values.po_box),
        google_map_location: toStr(values.map_url),
        year_of_construction: 0,
        other_charges: toStr(values.other_charges),
        available_from:
          toApiDate(values.available_from) || new Date().toISOString().slice(0, 10),
        current_tenant_id: toNum(values.current_tenant) || 0,
        internal_notes: toStr(values.internal_notes),
      };

      const payload = {
        block: toStr(values.building_block),
        building_details: toStr(values.building_name),
        floor: toStr(values.floor_number),
        flat_number: toNum(values.flat_no),
        dimension_length_ft: toStr(values.dimension_length ?? ''),
        dimension_breadth_ft: toStr(values.dimension_breadth ?? ''),
        dimension_area_sqft: toStr(values.carpet_area ?? ''),
        rental_type: rentalType,
        rental_for: values.rental_purpose === 'Commercial' ? 'Commercial' : 'Family',
        advance_amount_rent: 0,
        expected_rent: toStr(values.monthly_rent ?? ''),
        agreement_id: 0,
        photos: [],
        videos: [],
        assigned_to: { user_id: assignedUserId },
        property_details,
      };

      if (propertyType === 'flat') {
        payload.flat_data = {
          flat_number: toStr(values.flat_no),
          floor_number: toNum(values.floor_number),
          building_block: toStr(values.building_block),
          flat_configuration: FLAT_CONFIG_MAP[toStr(values.configuration)] || 'Studio',
          no_of_bathrooms: toNum(values.bathrooms),
          kitchen_type: toStr(values.kitchen_type),
          facing: toStr(values.facing),
          balcony: values.balcony === 'Yes',
          parking: values.amenity_Parking ?? false,
          lift: values.amenity_Lift ?? false,
          security: values.amenity_Security ?? false,
          gas_pipeline: values.amenity_GasPipeline ?? false,
          water_supply: values.amenity_WaterSupply ?? false,
          intercom: values.amenity_Intercom ?? false,
          fire_safety: values.amenity_FireSafety ?? false,
          power_backup: values.amenity_PowerBackup ?? false,
          cctv: values.amenity_CCTV ?? false,
          allowed_tenant_types: [
            values.tenant_Bachelor && 'Bachelor',
            values.tenant_Family && 'Family',
            values.tenant_CompanyStaff && 'Company Staff',
            values.tenant_Labour && 'Labour',
          ].filter(Boolean),
          store_room: values.store_room === 'Yes',
          maintenance_charge_amount: toStr(values.maintenance),
        };
      } else if (propertyType === 'villa') {
        payload.villa_data = {
          villa_name: toStr(values.building_name) || 'N/A',
          villa_type: 'Independent',
          villa_configuration: FLAT_CONFIG_MAP[toStr(values.configuration)] || '2BHK',
          project_name: 'N/A',
          plot_area_sqft: toStr(values.carpet_area) || 'N/A',
          number_of_bedrooms: 0,
          number_of_bathrooms: toNum(values.bathrooms) || 0,
          living_rooms_count: 0,
          servant_room: false,
          balcony_or_sitout: values.balcony === 'Yes',
          private_garden: false,
          terrace_access: false,
          boundary_wall: false,
          driveway: false,
          private_parking: 'Open',
          villa_maintenance_charge_type: 'Monthly',
          gardening_charges: '0',
          water_supply_24x7: false,
          security_guard: values.amenity_Security ?? false,
          clubhouse_access: false,
          gym: false,
          childrens_play_area: false,
          internal_roads: false,
          street_lights: false,
          gated_community: false,
          bachelor_allowed: false,
          pets_allowed: false,
          power_backup: values.amenity_PowerBackup ?? false,
          cctv: values.amenity_CCTV ?? false,
          allowed_tenant_types: [
            values.tenant_Bachelor && 'Bachelor',
            values.tenant_Family && 'Family',
            values.tenant_CompanyStaff && 'Company Staff',
            values.tenant_Labour && 'Labour',
          ].filter(Boolean),
          store_room: values.store_room === 'Yes',
          maintenance_charge_amount: toStr(values.maintenance) || '0',
        };
      } else {
        payload.commercial_data = {
          commercial_category: 'Shop',
          floor_number: 0,
          frontage_width_ft: '0',
          ceiling_height_ft: '0',
          no_of_cabins: 0,
          no_of_washrooms: 0,
          loading_area: 'Warehouse',
          power_load_kw: '0',
          has_dg_backup: false,
          lift_type: 'Passenger',
          fire_safety_compliant: false,
          emergency_exit: false,
          parking_availability: 'Open',
          commercial_maintenance_charge_type: 'Monthly',
          maintenance_charge_amount: '0',
          gst_applicable: false,
          gst_percentage: '0',
          security_deposit_months: 0,
          lease_type: 'Company',
          lease_tenure_years: 0,
          lock_in_period_months: 0,
          allowed_business: 'N/A',
          prohibited_business: 'N/A',
        };
      }

      const sanitized = sanitizePayload(payload);

      if (isUpdate && initialData?.propertyId) {
        const updatePayload = {
          property_id: initialData.propertyId,
          ...sanitized,
        };
        await httpClient.put(`${API_BASE_URL}/property/update/`, updatePayload, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        alert('Property updated successfully.');
      } else {
        await httpClient.post(`${API_BASE_URL}/property/create/`, sanitized, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        alert('Property added successfully.');
      }
    } catch (e) {
      const res = e?.response?.data;
      console.error('Failed to add property', e);
      console.error('Server response:', res);
      let msg = 'Failed to add property. Please try again.';
      if (res) {
        if (typeof res.message === 'string') msg = res.message;
        else if (typeof res.detail === 'string') msg = res.detail;
        else if (typeof res === 'object') {
          const parts = [];
          for (const [key, val] of Object.entries(res)) {
            if (Array.isArray(val)) parts.push(`${key}: ${val.join(', ')}`);
            else if (typeof val === 'string') parts.push(`${key}: ${val}`);
            else parts.push(`${key}: ${JSON.stringify(val)}`);
          }
          if (parts.length) msg = parts.join('\n');
        }
      } else if (e?.message) msg = e.message;
      alert(msg);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Basic Property Details</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <label className="form-label">Select Property Type</label>
              <Controller
                name="property_type"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="flat">Flat / Apartment</option>
                    <option value="villa">Villa/Banglow</option>
                    <option value="office">Commercial</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="property_code"
                label="Property Code / ID"
                placeholder="Auto-Generated"
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Building Name</label>
              <Controller
                name="building_name"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Building Name"
                    {...field}
                  />
                )}
              />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="building_block" label="Building Block" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="floor_number" label="Floor Number" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="flat_no" label="Flat No / Name" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="total_floors" label="Total Floors (Bldg)" />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Flat Configuration</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <label className="form-label">Configuration</label>
              <Controller
                name="configuration"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Studio">Studio</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="carpet_area"
                label="Carpet Area (Sq.Ft)"
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="builtup_area"
                label="Built-up Area (Sq.Ft)"
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Balcony</label>
              <Controller
                name="balcony"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="bathrooms"
                label="No. of Bathrooms"
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Kitchen Type</label>
              <Controller
                name="kitchen_type"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Store Room</label>
              <Controller
                name="store_room"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Facing</label>
              <Controller
                name="facing"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                  </select>
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Rental & Financial Details</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="monthly_rent"
                label="Monthly Rent"
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="security_deposit"
                label="Security Deposit"
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="maintenance"
                label="Maintenance (Monthly)"
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Electricity Type</label>
              <Controller
                name="electricity_type"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Meter">Meter</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Water Type</label>
              <Controller
                name="water_type"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Meter">Meter</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="other_charges"
                label="Other Charges"
              />
            </Col>
            <Col lg={4}>
              <label className="form-label">Late Fee (% / Amt)</label>
              <Controller
                name="late_fee"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                )}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Ownership</h4>
          <hr />
          <label className="form-label">Landlord ID</label>
          <Controller
            name="landlord_id"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                className="form-control"
                placeholder="Enter Landlord ID"
                min={1}
                {...field}
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(e.target.value === '' ? '' : Number(e.target.value))
                }
              />
            )}
          />
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Facilities & Amenities</h4>
          <hr />
          <Row className="g-3">
            {[
              { key: 'Parking', name: 'amenity_Parking' },
              { key: 'Lift', name: 'amenity_Lift' },
              { key: 'Power Backup', name: 'amenity_PowerBackup' },
              { key: 'Security', name: 'amenity_Security' },
              { key: 'CCTV', name: 'amenity_CCTV' },
              { key: 'Gas Pipeline', name: 'amenity_GasPipeline' },
              { key: 'Water Supply', name: 'amenity_WaterSupply' },
              { key: 'Intercom', name: 'amenity_Intercom' },
              { key: 'Fire Safety', name: 'amenity_FireSafety' },
            ].map(({ key: item, name }) => (
              <Col lg={3} key={item}>
                <Controller
                  name={name}
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Form.Check
                      type="checkbox"
                      label={item}
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Tenant Preference</h4>
          <hr />
          <label className="form-label">Rental Purpose</label>
          <Controller
            name="rental_purpose"
            control={control}
            render={({ field }) => (
              <select className="form-control mb-3" {...field}>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            )}
          />

          <label className="form-label">Tenant Type Allowed</label>
          <Row className="g-3">
            {[
              { label: 'Bachelor', name: 'tenant_Bachelor' },
              { label: 'Family', name: 'tenant_Family' },
              { label: 'Company Staff', name: 'tenant_CompanyStaff' },
              { label: 'Labour', name: 'tenant_Labour' },
            ].map(({ label: t, name }) => (
              <Col lg={3} key={t}>
                <Controller
                  name={name}
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Form.Check
                      label={t}
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Availability & Status</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <label className="form-label">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select className="form-control" {...field}>
                    <option value="Vacant">Vacant</option>
                    <option value="Occupied">Occupied</option>
                  </select>
                )}
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="available_from"
                label="Available From"
                placeholder="dd-mm-yyyy"
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="current_tenant"
                label="Current Tenant"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Location Details</h4>
          <hr />
          <TextFormInput control={control} name="address1" label="Address Line 1" />
          <TextFormInput control={control} name="address2" label="Address Line 2" />
          <Row className="g-3 mt-1">
            <Col lg={4}>
              <TextFormInput control={control} name="area" label="Area / Locality" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="city" label="City" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="state" label="State" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="country" label="Country" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="po_box" label="PO BOX" />
            </Col>
            <Col lg={4}>
              <TextFormInput control={control} name="map_url" label="Google Map URL" />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">Internal Tracking</h4>
          <hr />
          <TextAreaFormInput
            control={control}
            name="internal_notes"
            label="Internal Notes"
          />
          <TextFormInput control={control} name="created_by" label="Created By" />
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <h4 className="fw-semibold">System Fields (Auto)</h4>
          <hr />
          <Row className="g-3">
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="created_time"
                label="Created Time"
                placeholder="TimeStamp"
                readOnly
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="updated_by"
                label="Last Updated By"
                readOnly
              />
            </Col>
            <Col lg={4}>
              <TextFormInput
                control={control}
                name="updated_time"
                label="Last Updated Time"
                readOnly
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div className="d-flex justify-content-end gap-2 mb-4">
        <Button variant="outline-secondary">Cancel</Button>
        <Button variant="primary" type="submit">
          {isUpdate ? 'Update Property' : 'Add Property'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyAdd;

