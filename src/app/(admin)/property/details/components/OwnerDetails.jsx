import avatar1 from '@/assets/images/users/avatar-1.jpg';
import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
const OwnerDetails = () => {
  const messageSchema = yup.object({
    date: yup.string().required('Please enter date'),
    time: yup.string().required('Please enter time'),
    name: yup.string().required('Please enter your name'),
    email: yup.string().email().required('Please enter email'),
    number: yup.string().required('Please enter number'),
    description: yup.string().required('Please enter description')
  });
 
  return
};
export default OwnerDetails;