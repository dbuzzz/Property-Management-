import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import PropertiesData from './components/PropertiesData';
import PropertiesFilter from './components/PropertiesFilter';

const initialFilters = {
  minPrice: 6000,
  maxPrice: 100000,
};

const PropertyGridPage = () => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFiltersChange = (next) => {
    setFilters((prev) =>
      typeof next === 'function' ? next(prev) : { ...prev, ...next },
    );
  };

  return (
    <>
      <PageTitle title="Property List" subName="" />
      <Row>
        <PropertiesFilter onFiltersChange={handleFiltersChange} />
        <PropertiesData filters={filters} />
      </Row>
    </>
  );
};

export default PropertyGridPage;