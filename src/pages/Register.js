import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Logo,FormRow } from '../components';
import {toast } from 'react-toastify';
import {useSelector,  useDispatch} from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name:'',
  email:'',
  password:'',
  isMember:true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const {user, isLoading} = useSelector((store)=>store.user);
  const navigate = useNavigate();
  
  const handleChange=(e) => {
    const name =e.target.name;
    const value = e.target.value;
    
    setValues({...values, [name]:value});
    
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if(!email || !password || (!isMember  && !name)) {
      toast.error('please fill out all fields');
      return;
    }
    if(isMember) {
      dispatch(loginUser({email,password}));
      return;
    } else {
      dispatch(registerUser({name, email, password}));
      return;
    }
  }

  const toggleMember= ()=>{
    setValues({...values, isMember:!values.isMember});
  }

  useEffect(()=>{
    if(user) {
        setTimeout(()=>{
      navigate('/')
    }, 3000);
    }
  
  },[user,navigate]);
  return (
    <Wrapper>
      <form className='form' onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember?'Login':'Register'}</h3>
        {!values.isMember && (
           <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
        )}
       
         <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
         <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
        
        <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading?'loading...':'submit'}</button>    

        <button type='button' className='btn btn-block  btn-hispter' disabled={isLoading}
        onClick={()=>dispatch(loginUser({email:'testUser@test.com',password:'secret'}))}>{isLoading?'loading...':'demo app'}</button>
          <p>
        {values.isMember? 'not a Member yet?' : 'Already a Memeber'}
          <button type='button' className='member-btn'  onClick={toggleMember}>{values.isMember?'Register':'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
display:grid;
align-items:center;
.logo {
  display: block;
  margin:0 auto;
  margin-bottom:1.38em;
}

.form {
  max-width:400px;
  border-top:5px solid var(--primary-500);
  
}
h3 {
  text-align:center;
}
p {
  text-align:center;
  margin-top:1rem;
}
.btn {
  margin-top:1rem;
}
.member-btn {
  background:transparent;
  border:transparent;
  color:var(--primary-500);
  cursor:pointer;
  letter-spacing:var(--letterSpacing);
}
`;
export default Register
