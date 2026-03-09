// import { url } from "inspector";

export const MENU_ITEMS = [{
  key: 'menu',
  label: 'MENU',
  isTitle: true
}, {
  key: 'dashboards',
  label: 'Dashboards',
  url: '/dashboards',
  icon: 'ri:dashboard-2-line',
  
}, {
  key: 'Addleads',
  label: 'Add Leads',
  icon: 'ri:community-line',
  url: '/add leads'
},


 {
  key: 'Landlord',
  label: 'Landlord',
  icon: 'ri:contacts-book-3-line',
   url: '/agentDashboard', 
  children: [
    
   
   {
    key: 'Add-Property',
    label: 'Add Property',
    url: '/landlord/add-property',
    parentKey: 'landlord'
  }, {
    key: 'Property-List',
    label: 'Property List',
    url: '/landlord/property-grid',
    parentKey: 'landlord'
  }, {
    key: 'Landlord-list',
    label: 'Landlord List',
    url: '/landlord-list',
    parentKey: 'landlord'
  },]
},    {
  key: 'Tenants',
  label: 'Tenants',
  url : '/tenants',
  icon: 'ri:news-line',
  children: [{
    key: 'Tenants-list',
    label: 'Tenants List',
    url: '/list',
    parentKey: 'Tenants'
  },]
}, {
  key: 'messages',
  label: 'Messages',
  icon: 'ri:discuss-line',
  url: '/messages'
}, {
  key: 'Reports',
  label: 'Reports',
  icon: 'ri:pages-line',
  children: [{
    key: 'Tenants-report',
    label: 'Tenants Report',
    url: '/Tenants-report',
    parentKey: 'Reports'
  }, {
    key: 'Landlord-report',
    label: 'Landlord-Report',
    url: '/Landlord-report/calendar',
    parentKey: 'Reports'
  }, {
    key: 'property-report',
    label: 'Property Report',
    url: '/Property-report',
    parentKey: 'Reports'
  },  ]
},  ];