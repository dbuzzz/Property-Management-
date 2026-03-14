import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { API_BASE_URL, AUTH_TOKEN } from '@/constants/api';
import httpClient from '@/helpers/httpClient';
import { getPropertyImageUrl } from '@/utils/imageStorage';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const PropertiesCard = ({
  bath,
  beds,
  flor,
  size: ft,
  icon,
  location,
  name,
  price,
  type,
  variant,
  save,
  image,
  landlordName,
  assignedName,
  raw,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (raw?.propertyId) {
      navigate('/landlord/detailspage', {
        state: {
          propertyId: raw.propertyId,
          property: raw,
        },
      });
    } else {
      navigate('/landlord/detailspage');
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit && raw) onEdit(raw);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete && raw) onDelete(raw);
  };

  return (
    <Card
      onClick={handleCardClick}
      style={{ cursor: 'pointer', minWidth: 0 }}
      className="overflow-hidden h-100 w-100"
    >
      <div className="position-relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={image}
          alt="properties"
          className="img-fluid rounded-top w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        <span className="position-absolute top-0 end-0 p-1">
          <span className={`badge bg-${variant} text-white fs-13`}>{type}</span>
        </span>
      </div>
      <CardBody className="d-flex flex-column" style={{ minHeight: 0 }}>
        <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
          <div className="avatar bg-light rounded flex-centered flex-shrink-0">
            <IconifyIcon icon={icon} width={24} height={24} className="fs-24 text-primary" />
          </div>
          <div className="min-w-0 flex-grow-1">
            <div className="text-dark fw-medium fs-16 text-truncate" title={name}>{name}</div>
            <p className="text-muted mb-0 text-truncate small" title={location}>{location}</p>
          </div>
        </div>
        <Row className="mt-2 g-2">
          <Col xs={6}>
            <span
              className="badge bg-light-subtle text-muted border fs-12 d-flex align-items-center gap-1 w-100"
              style={{ padding: '8px 6px' }}
            >
              <IconifyIcon icon="solar:bed-broken" className="fs-14 flex-shrink-0" />
              <span className="text-truncate">{beds} Bed</span>
            </span>
          </Col>
          <Col xs={6}>
            <span
              className="badge bg-light-subtle text-muted border fs-12 d-flex align-items-center gap-1 w-100"
              style={{ padding: '8px 6px' }}
            >
              <IconifyIcon icon="solar:bath-broken" className="fs-14 flex-shrink-0" />
              <span className="text-truncate">{bath} Bath</span>
            </span>
          </Col>
          <Col xs={6}>
            <span
              className="badge bg-light-subtle text-muted border fs-12 d-flex align-items-center gap-1 w-100"
              style={{ padding: '8px 6px' }}
            >
              <IconifyIcon icon="solar:scale-broken" className="fs-14 flex-shrink-0" />
              <span className="text-truncate">{ft} ft</span>
            </span>
          </Col>
          <Col xs={6}>
            <span
              className="badge bg-light-subtle text-muted border fs-12 d-flex align-items-center gap-1 w-100"
              style={{ padding: '8px 6px' }}
            >
              <IconifyIcon
                icon="solar:double-alt-arrow-up-broken"
                className="fs-14 flex-shrink-0"
              />
              <span className="text-truncate">{flor} Floor</span>
            </span>
          </Col>
        </Row>
        <p className="mb-0 mt-2 small text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.3 }}>
          <span className="d-inline-block text-truncate" style={{ maxWidth: '100%' }} title={`Landlord: ${landlordName || '---'} | Assigned: ${assignedName || '---'}`}>
            Landlord : <span className="fw-medium">{landlordName || '---'}</span> | Assigned : <span className="fw-medium">{assignedName || '---'}</span>
          </span>
        </p>
      </CardBody>
      <CardFooter className="bg-light-subtle d-flex justify-content-between align-items-center border-top flex-wrap gap-2 mt-auto">
        <div className="d-flex align-items-center gap-2">
          {type === '' ? (
            <p className="fw-medium text-muted text-decoration-line-through fs-16 mb-0">
              OMR {price}.00
            </p>
          ) : (
            <p className="fw-medium text-dark fs-16 mb-0">OMR {price}.00 </p>
          )}
          <Link to="" className="link-primary fw-medium" onClick={(e) => e.stopPropagation()}>
            More Inquiry <IconifyIcon icon="ri:arrow-right-line" className="align-middle" />
          </Link>
        </div>
        <div className="d-flex gap-1" onClick={(e) => e.stopPropagation()}>
          {onEdit && raw && (
            <Button variant="soft-primary" size="sm" title="Edit" onClick={handleEditClick}>
              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
            </Button>
          )}
          {onDelete && raw && (
            <Button variant="soft-danger" size="sm" title="Delete" onClick={handleDeleteClick}>
              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const buildGetAllUrl = (params) => {
  const search = new URLSearchParams();
  if (params.filter_key != null) search.set('filter_key', params.filter_key);
  if (params.filter_value != null) search.set('filter_value', params.filter_value);
  const qs = search.toString();
  return `${API_BASE_URL}/property/get_all/${qs ? `?${qs}` : ''}`;
};

const applyClientFilters = (items, f) => {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    const d = item?.data ?? item;
    const pd = d?.propertyDetails ?? {};
    const priceNum = parseFloat(pd?.monthly_rent ?? d?.expectedRent ?? 0, 10) || 0;
    if (f.minPrice != null && priceNum < Number(f.minPrice)) return false;
    if (f.maxPrice != null && priceNum > Number(f.maxPrice)) return false;
    return true;
  });
};

const PropertiesData = ({ filters = {} }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(() => ({
    filter_key: 'is_active',
    filter_value: 'true',
    limit: 12,
    sort_by: 'name',
    sort_order: 'asc',
    page_num: 1,
  }));

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildGetAllUrl(params);
      const res = await httpClient.get(url, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}`, Accept: 'application/json' },
      });
      const payload = res.data;
      const empty = { data: [], presentPage: 1, totalPage: 0 };
      if (!payload) {
        setData(empty);
        return;
      }
      const page = payload.data;
      if (Array.isArray(page)) {
        setData({
          data: page,
          presentPage: payload.presentPage ?? 1,
          totalPage: payload.totalPage ?? 0,
        });
      } else if (page && (Array.isArray(page.data) || page.presentPage !== undefined)) {
        setData({
          data: Array.isArray(page.data) ? page.data : [],
          presentPage: page.presentPage ?? 1,
          totalPage: page.totalPage ?? 0,
        });
      } else {
        setData(empty);
      }
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || 'Failed to load properties');
      setData({ data: [], presentPage: 1, totalPage: 0 });
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleDeleteProperty = useCallback(async (prop) => {
    const propertyId = prop.propertyId;
    const name = prop.buildingDetails || prop.propertyDetails?.building_name || (propertyId ? `Property #${propertyId}` : 'this property');
    if (!propertyId) {
      alert('Cannot delete this property because its ID is missing.');
      return;
    }
    const confirmed = window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`);
    if (!confirmed) return;
    try {
      await httpClient.delete(`${API_BASE_URL}/property/delete/?property_id=${propertyId}`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}`, Accept: 'application/json' },
      });
      fetchProperties();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to delete property';
      alert(typeof e?.response?.data === 'string' ? e.response.data : msg);
    }
  }, [fetchProperties]);

  const rawList = data?.data ?? [];
  const list = applyClientFilters(rawList, {
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });
  const presentPage = data?.presentPage ?? 1;
  const totalPage = data?.totalPage ?? 0;

  const goToPage = (page) => {
    const next = Math.max(1, Math.min(page, totalPage || 1));
    setParams((p) => ({ ...p, page_num: next }));
  };

  const cards = list.map((item, idx) => {
    const d = item?.data ?? item;
    const pd = d?.propertyDetails ?? {};
    const fd = d?.flatData ?? {};
    const name =
      d?.buildingDetails || pd?.building_name || `Property ${d?.propertyId ?? ''}`;
    const location =
      [pd?.city, pd?.country].filter(Boolean).join(', ') ||
      pd?.address_line_1 ||
      '—';
    const price = pd?.monthly_rent ?? d?.expectedRent ?? '0';
    const bedsText = fd?.flat_configuration ?? '';
    const bedsNumMatch = bedsText.match(/(\d+)/);
    const beds = bedsNumMatch ? bedsNumMatch[1] : '—';
    const bath = fd?.no_of_bathrooms ?? '—';
    const size = d?.dimensionAreaSqft ?? pd?.carpet_area_sqft ?? '—';
    const flor = d?.floor ?? fd?.floor_number ?? '—';
    const image = getPropertyImageUrl(d?.propertyId, d?.photos);

    const landlordName =
      pd?.landlord_name ||
      pd?.landlordName ||
      (pd?.landlord_id ? `ID ${pd.landlord_id}` : '---');
    const assignedName =
      d?.assignedTo?.name ||
      (d?.assignedTo?.userId ? `User #${d.assignedTo.userId}` : '---');

    return {
      key: d?.propertyId ?? idx,
      props: {
        bath,
        beds,
        flor,
        size,
        icon: 'solar:home-2-broken',
        location,
        name,
        price,
        type: 'Rent',
        variant: 'success',
        save: false,
        image,
        landlordName,
        assignedName,
        raw: d,
      },
    };
  });

  return (
    <Col xl={9} lg={12}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="text-center py-5 text-danger">{error}</div>
      ) : cards.length === 0 ? (
        <div className="text-center py-5 text-muted">
          No properties found. Try adjusting your filters.
        </div>
      ) : (
        <Row className="g-3">
          {cards.map((item) => (
            <Col xl={6} lg={6} md={6} xs={12} key={item.key} className="d-flex">
              <PropertiesCard
                {...item.props}
                onEdit={(prop) => navigate('/property/edit', { state: { property: prop } })}
                onDelete={handleDeleteProperty}
              />
            </Col>
          ))}
        </Row>
      )}
      {!loading && !error && totalPage > 0 && (
        <div className="p-3 border-top">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end mb-0">
              <li className={`page-item ${presentPage <= 1 ? 'disabled' : ''}`}>
                <button
                  type="button"
                  className="page-link"
                  onClick={() => goToPage(presentPage - 1)}
                  disabled={presentPage <= 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${presentPage === page ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${presentPage >= totalPage ? 'disabled' : ''}`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => goToPage(presentPage + 1)}
                  disabled={presentPage >= totalPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </Col>
  );
};

export default PropertiesData;