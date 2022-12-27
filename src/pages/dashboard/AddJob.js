import { useSelector,useDispatch } from "react-redux";
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import {FormRow, FormRowSelect} from '../../components';
import {handleChange, clearValues, createJob, updateJob} from '../../features/job/jobSlice';
import {toast} from 'react-toastify';
import { useEffect } from "react";


const Addjob = () => {
  const {isLoading,
  position,
company,
jobLocation,jobType,
jobTypeOptions,
status,
statusOptions,
isEditing,
editJobId,
} = useSelector((store)=>store.job);

const {user} = useSelector((store)=>store.user);


const dispatch = useDispatch();

const handleSubmit = (e)=>{
  e.preventDefault();
  if(!position || !company ||!jobLocation) {
    toast.error('Please fill out all fields');
    return;
  }
  if(isEditing) {
      return dispatch(updateJob({
                          jobId:editJobId,
                          job:{position,company,jobLocation,jobType,status},
                          })
                      );
  } else {
     return dispatch(createJob({position,company,jobLocation,jobType,status}));
  }
 
}

const handleJobInput = (e)=>{
  
  const name =e.target.name;
  const value= e.target.value;
  dispatch(handleChange({name,value}));
}

useEffect(()=>{
  if(!isEditing) {
    dispatch(handleChange({name:'jobLocation', value:user.location}));
  }
},[]);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
      <h3>{isEditing?'edit job':'add job'}</h3>
      <div className="form-center">
        <FormRow name='position' type='text' value={position} handleChange={handleJobInput} />
        <FormRow name='company' type='text' value={company} handleChange={handleJobInput} />
        <FormRow labeltext='job location' name='jobLocation' type='text' value={jobLocation} handleChange={handleJobInput} />

        <FormRowSelect name='status'  value={status} list={statusOptions} handleChange={handleJobInput} />
        <FormRowSelect name='jobType' labelText='job type' value={jobType} list={jobTypeOptions} handleChange={handleJobInput}/>
        
        <div className="btn-container">
            <button type='button' className="btn btn-block clear-btn" onClick={()=>dispatch(clearValues())}>clear</button>
            <button type='submit' className="btn btn-block submit-btn" disabled={isLoading}>submit</button>
        </div>
        </div>
      </form>
        
    </Wrapper>
  )
}

export default Addjob
