import path from 'path';
import React from 'react'
import { lazy } from 'react';
const Dashboard = lazy(() => import('../app/(admin)/dashboards/analytics/page.jsx'));
const PropertyAddPage = lazy(() => import('../app/(admin)/property/add/page.jsx'));
// const Assignmentproperty = lazy(() => import('../app/(admin)/assignmentproperty/Save/page.jsx'));
const Assignmentproperty = lazy(() => import('../app/(admin)/AssignmentProperty/Save/page.jsx'));
const PropertyGridPage = lazy(() => import('../app/(admin)/property/grid/page.jsx'));
const Propertydetailspage = lazy(() => import('../app/(admin)/property/details/page.jsx'));
const PropertyEditPage = lazy(() => import('../app/(admin)/property/edit/page.jsx'));
const ChatPage = lazy(() => import('../app/(admin)/messages/page.jsx'));
const ListViewPage = lazy(() => import('../app/(admin)/agents/list-view1/components/page.jsx'));

const CustomerAddPage = lazy(() => import('../app/(admin)/customers/add/page.jsx'));
const ListViewPage1 = lazy(() => import('../app/(admin)/agents/list-view/components/page.jsx'));
const GridViewPage = lazy(() => import('../app/(admin)/agents/grid-view/page.jsx'));
// const Agentsdetailspage = lazy(() => import('../app/(admin)/agents/details/components/page.jsx'));
const Agentsdetailspage = lazy(() => import('../app/(admin)/agents/details/page.jsx'));
const CustomersDetails = lazy(() => import('../app/(admin)/customers/details/page.jsx'));
const AllLeadsPage = lazy(() => import('../app/(admin)/leads/list/page.jsx'));
const LeadPreviewPage = lazy(() => import('../app/(admin)/leads/preview/page.jsx'));
const LeadEditPage = lazy(() => import('../app/(admin)/leads/edit/page.jsx'));

const Navigate = React.lazy(() => import('react-router-dom').then(module => ({ default: module.Navigate })));
const AuthSignIn = lazy(() => import('@/app/(other)/auth/sign-in/page'));
const AuthSignUp = lazy(() => import('@/app/(other)/auth/sign-up/page'));
const ResetPassword = lazy(() => import('@/app/(other)/auth/reset-password/page'));
const LockScreen = lazy(() => import('@/app/(other)/auth/lock-screen/page'));
const ComingSoon = lazy(() => import('@/app/(other)/coming-soon/page'));
const Maintenance = lazy(() => import('@/app/(other)/maintenance/page'));
const Error404 = lazy(() => import('@/app/(other)/(error-pages)/404-error/page'));
const Report = lazy(() => import('../app/(admin)/Report/Tenant Report/components/page.jsx'));
const Report1 = lazy(() => import('../app/(admin)/Report1/componets/page.jsx'));
const Report2 = lazy(() => import('../app/(admin)/Report2/components/page.jsx'));
const Comment = lazy(() => import('../app/(admin)/Comment/Comment.jsx'));
// const Assignproperty = lazy(() => import('../app/(admin)/Assignproperty/Assignproperty.jsx'));
const AgentPage = lazy(() => import('../app/(admin)/agent/page.jsx'));
const ProfileSettingPage = lazy(() => import('../components/layout/TopNavigationBar/components/ProfileSettingPage.jsx'));

// const Report = lazy(() => import('../app/(admin)/Report/Tenant Report/components/page.jsx'));
const initialRoutes = [{
  path: '/',
  name: 'root',
  element: <Navigate to="/dashboards" />
}];

const routes = [{
  path: '/dashboards',
  name: 'Analytics',
  element: <Dashboard />
},
{
  path: '/add leads',
  name: 'Add leads',
  element: <CustomerAddPage />
},
{
  path: '/all-leads',
  name: 'All Leads',
  element: <AllLeadsPage />
},
{
  path: '/lead/preview',
  name: 'Lead Preview',
  element: <LeadPreviewPage />
},
{
  path: '/lead/edit',
  name: 'Update Lead',
  element: <LeadEditPage />
},
{
  path: '/agentDashboard',
  name: ' AgentPage',
  element: <AgentPage />
},


{
  path: '/landlord/add-property',
  name: 'Add Property',
  element: <PropertyAddPage />
},

{
  path: '/landlord/property-grid',
  name: 'Property Grid',
  element: <PropertyGridPage />
},
{
  path: '/landlord/detailspage',
  name: 'Property details',
  element: <Propertydetailspage />
},
{
  path: '/property/edit',
  name: 'Edit Property',
  element: <PropertyEditPage />
},

{
  path: '/landlord-list',
  name: 'landlord List',
  element: <ListViewPage1 />
},
{
  path: '/comment',
  name: 'Comment',
  element: <Comment />
},

{
  path: '/Agent-Details',
  name: 'Agents details',
  element: <Agentsdetailspage />
},

{
  path: '/Tenants',
  name: 'Tenants  Dashboard',
  element: <GridViewPage />
},
{
  path: '/list',
  name: 'tenants  List View',
  element: <ListViewPage />

},
{
  path: '/Assignment-property',
  name: 'Assignment-Property',
  element: <Assignmentproperty />
},
{
  path: '/messages',
  name: 'Messages',
  element: <ChatPage />
},
{
  path: '/profile-setting',
  name: 'Profile Setting',
  element: <ProfileSettingPage />
},



{
  path: '/Tenants-report',
  name: 'Tenant  Report',
  element: <Report />
},
{
  path: '/Landlord-report/calendar',
  name: 'Landlord  Report',
  element: <Report1 />
},
{
  path: '/Property-report',
  name: 'Property  Report',
  element: <Report2 />
},
{
  path: '/landlord-list',
  name: 'landlord List',
  element: <ListViewPage1 />
},
{
  name: 'CustomersDetails',
  path: '/Customers-Details',
  element: <CustomersDetails />
},


];

export const authRoutes = [{
  name: 'Sign In',
  path: '/auth/sign-in',
  element: <AuthSignIn />
}, {
  name: 'Sign Up',
  path: '/auth/sign-up',
  element: <AuthSignUp />
}, {
  name: 'Reset Password',
  path: '/auth/reset-password',
  element: <ResetPassword />
}, {
  name: 'Lock Screen',
  path: '/auth/lock-screen',
  element: <LockScreen />
}, {
  name: '404 Error',
  path: '/404-error',
  element: <Error404 />
}, {
  name: 'Maintenance',
  path: '/maintenance',
  element: <Maintenance />
}, {
  name: 'Coming Soon',
  path: '/coming-soon',
  element: <ComingSoon />
}];
export const appRoutes = [...initialRoutes, ...routes, authRoutes];







