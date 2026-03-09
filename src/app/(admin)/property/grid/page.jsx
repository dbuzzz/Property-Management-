import PageTitle from '@/components/PageTitle';
import { Row } from 'react-bootstrap';
import PropertiesData from './components/PropertiesData';
import PropertiesFilter from './components/PropertiesFilter';
const PropertyGridPage = () => {
  return <>
      <PageTitle title="Property List" subName="" />
      <Row>
        <PropertiesFilter />
        <PropertiesData />
      </Row>
    </>;
};
export default PropertyGridPage;