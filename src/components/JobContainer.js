import Wrapper from '../assets/wrappers/JobsContainer';
import {useSelector, useDispatch} from 'react-redux';
import {Job, Loading} from '../components';
import { useEffect } from 'react';
import {getAllJobs} from '../features/allJobs/allJobsSlice';
import PaginationBtnContainer from './PaginationBtnContainer';

const JobContainer = () => {
 const {jobs, isLoading, totalJobs,numOfPages, page,
search,searchStatus,searchType,sort} = useSelector((store)=>store.allJobs);
 const dispatch = useDispatch();

 useEffect(()=>{
  dispatch(getAllJobs());
 },[page, search, searchStatus, searchType, sort]);

  if(isLoading) {
     return <Loading center='center' />
  }
  if(jobs.length === 0) {
    return (
      <Wrapper>
        <h2>no jobs to display....</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5> {totalJobs} jobs found</h5>
      <div className='jobs'>
        {jobs.map((job)=>{
          return (
            <Job key={job._id} {...job} />
          );
        })}
      </div>
      <PaginationBtnContainer />
    </Wrapper>
  )

}

export default JobContainer;
