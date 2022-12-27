import {useState} from 'react';
import {FormRow} from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {updateUser} from '../../features/user/userSlice';

const Profile = () => {
 const {isLoading, user} = useSelector((store)=>store.user);
 const dispatch = useDispatch();

 const [userData, setUserData] = useState({
  name:user?.name||'',
  lastName:user?.lastName||'',
  email:user?.email||'',
  location:user?.location||''
 })

 const handleChange =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData,[name]:value});
 }
 const handleSubmit = (e)=>{
    e.preventDefault();
    const {name,email, lastName,location} = userData;
    if(!name || !email ||!lastName || !location) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    dispatch(updateUser({name,email, lastName,location}));
 }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-center'>
          <FormRow type='text' name='name' value={userData.name} handleChange={handleChange} ></FormRow>
          <FormRow type='text' name='lastName' labelText={'last name'} value={userData.lastName} handleChange={handleChange} ></FormRow>
          <FormRow type='email' name='email' value={userData.email} handleChange={handleChange} ></FormRow>
          <FormRow type='text' name='location' value={userData.location} handleChange={handleChange} ></FormRow>
          <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading?'Please Wait...':'save changes'}</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile;
