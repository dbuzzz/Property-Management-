import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { API_BASE_URL, AUTH_TOKEN } from '@/constants/api';
import httpClient from '@/helpers/httpClient';
import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const buildGetAllUrl = (params) => {
  const search = new URLSearchParams();
  if (params.filter_key != null) search.set('filter_key', params.filter_key);
  if (params.filter_value != null) search.set('filter_value', params.filter_value);
  if (params.limit != null) search.set('limit', String(params.limit));
  if (params.page_num != null) search.set('page_num', String(params.page_num));
  if (params.sort_by != null) search.set('sort_by', params.sort_by);
  if (params.sort_order != null) search.set('sort_order', params.sort_order);
  if (params.search_key != null) search.set('search_key', params.search_key);
  if (params.value != null) search.set('value', params.value);
  if (params.from_date != null) search.set('from_date', params.from_date);
  if (params.to_date != null) search.set('to_date', params.to_date);
  if (params.purpose != null) search.set('purpose', params.purpose);
  const qs = search.toString();
  return `${API_BASE_URL}/lead/get_all/${qs ? `?${qs}` : ''}`;
};

const TENANT_PURPOSES = ['tenant', 'family', 'company_staff', 'bachelor', 'labour'];
const LANDLORD_PURPOSES = ['landlord', 'owner', 'personal'];

const LeadList = ({ purposeFilter }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    filter_key: 'is_active',
    filter_value: 'true',
    limit: 10,
    sort_by: 'name',
    page_num: 1,
    ...(purposeFilter && { purpose: purposeFilter }),
  });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildGetAllUrl(params);
      const res = await httpClient.get(url, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          Accept: 'application/json',
        },
      });
      if (res.data?.status && res.data?.data) {
        setData(res.data.data);
      } else {
        setData({ data: [], presentPage: 1, totalPage: 0 });
      }
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || 'Failed to load leads');
      setData({ data: [], presentPage: 1, totalPage: 0 });
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const rawLeads = data?.data ?? [];
  const leads =
    purposeFilter === 'tenant'
      ? rawLeads.filter((l) => TENANT_PURPOSES.includes(String(l.purpose || '').toLowerCase()))
      : purposeFilter === 'landlord'
        ? rawLeads.filter((l) => LANDLORD_PURPOSES.includes(String(l.purpose || '').toLowerCase()))
        : rawLeads;
  const presentPage = data?.presentPage ?? 1;
  const totalPage = data?.totalPage ?? 0;

  const goToPage = (page) => {
    const next = Math.max(1, Math.min(page, totalPage || 1));
    setParams((p) => ({ ...p, page_num: next }));
  };

  const handleDeleteLead = useCallback(
    async (lead) => {
      const leadId = lead.leadId ?? lead.lead_id;
      const name =
        [lead.firstName, lead.lastName].filter(Boolean).join(' ') ||
        (leadId ? `Lead #${leadId}` : 'this lead');
      if (!leadId) {
        alert('Cannot delete this lead because its ID is missing from the server response.');
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      );
      if (!confirmed) return;

      try {
        await httpClient.delete(`${API_BASE_URL}/lead/delete/?lead_id=${leadId}`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}`, Accept: 'application/json' },
        });
        fetchLeads();
      } catch (e) {
        const raw = e?.response?.data;
        let msg =
          (raw && typeof raw === 'string' && raw) ||
          (raw && typeof raw.message === 'string' && raw.message) ||
          e?.message ||
          'Failed to delete lead';

        if (
          msg.includes('Cannot delete some instances of model') ||
          msg.includes('protected foreign keys')
        ) {
          msg = 'This lead cannot be deleted because it is linked to one or more properties.';
        } else if (msg.includes('has no lead_id')) {
          msg =
            'The server reported that the lead has no ID. Try refreshing the list and attempting again.';
        }

        alert(msg);
      }
    },
    [fetchLeads]
  );

  const formatDate = (iso) => {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return iso;
    }
  };

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
            <CardTitle as="h4">
              {purposeFilter === 'tenant'
                ? 'Tenants List (Leads)'
                : purposeFilter === 'landlord'
                  ? 'Landlord List (Leads)'
                  : 'All Leads List'}
            </CardTitle>
            <Dropdown>
              <DropdownToggle
                as="a"
                className="btn btn-sm btn-outline-light rounded content-none icons-center"
                href="#"
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
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : error ? (
              <div className="text-center py-5 text-danger">{error}</div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle text-nowrap table-hover mb-0">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Lead ID</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Assigned To</th>
                      <th>Origin</th>
                      <th>Purpose</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center text-muted py-4">
                          No leads found.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead.leadId}>
                          <td className="fw-medium text-muted">{lead.leadId}</td>
                          <td>
                            <span className="fw-medium text-dark">
                              {[lead.firstName, lead.lastName].filter(Boolean).join(' ') || '—'}
                            </span>
                          </td>
                          <td>{lead.address || '—'}</td>
                          <td>{lead.phone_number ?? lead.phoneNumber ?? '—'}</td>
                          <td>
                            <span className="fw-medium">
                              {lead.lead_assign_to_id ?? lead.leadAssignTo?.userId ?? '—'}
                            </span>
                          </td>
                          <td>{lead.leadOrigin ?? '—'}</td>
                          <td>{lead.purpose ?? '—'}</td>
                          <td>{formatDate(lead.createdAt)}</td>
                          <td>
                            <span
                              className={`badge bg-${
                                lead.isActive ? 'success' : 'danger'
                              }-subtle text-${lead.isActive ? 'success' : 'danger'} px-3 py-1`}
                            >
                              {lead.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="light"
                                size="sm"
                                title="View details"
                                onClick={() => navigate('/lead/preview', { state: { lead } })}
                              >
                                <IconifyIcon icon="solar:eye-broken" />
                              </Button>
                              <Button
                                variant="soft-primary"
                                size="sm"
                                title="Edit"
                                onClick={() => navigate('/lead/edit', { state: { lead } })}
                              >
                                <IconifyIcon icon="solar:pen-2-broken" />
                              </Button>
                              <Button
                                variant="light"
                                size="sm"
                                title="Delete"
                                className="text-danger"
                                onClick={() => handleDeleteLead(lead)}
                              >
                                <IconifyIcon icon="solar:trash-bin-2-broken" />
                              </Button>
                              <Button
                                variant="light"
                                size="sm"
                                title="Comments"
                                onClick={() => navigate('/comments')}
                              >
                                <IconifyIcon icon="ri:time-line" width={18} height={18} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>

          {!loading && !error && totalPage > 0 && (
            <CardFooter>
              <nav>
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
                  <li className={`page-item ${presentPage >= totalPage ? 'disabled' : ''}`}>
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
            </CardFooter>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default LeadList;

