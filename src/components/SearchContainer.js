import {FormRow, FormRowSelect} from '../components';
import Wrapper from '../assets/wrappers/SearchContainer';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useMemo } from 'react';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {

  const {isLoading, search, searchStatus,searchType,sort,sortOptions} = useSelector((store)=>store.allJobs);
  const dispatch =useDispatch();
  const {jobTypeOptions, statusOptions} = useSelector((store)=>store.job);
  
  const [localSearch, setLocalSearch] = useState('');

  const handleSearch=(e)=>{
    const name = e.target.name;
    const value = e.target.value; 
    dispatch(handleChange({name, value}))
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  }

  const debounce = () =>{
    let timeOutID;
    return (e) =>{
      setLocalSearch(e.target.value);
      clearTimeout(timeOutID);
      timeOutID = setTimeout(()=>{
        dispatch(handleChange({name:e.target.name, value:e.target.value}))
      },1000);
    }

  };

  const optimizedDebounce = useMemo(()=>debounce(),[])

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow type='text' name='search' value={localSearch} handleChange={optimizedDebounce}/>
           <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch}
            list={['all',...statusOptions]}
           />
           <FormRowSelect labelText='type' name='searchType' value={searchType} handleChange={handleSearch}
            list={['all',...jobTypeOptions]}
           />
            <FormRowSelect name='sort' value={sort} handleChange={handleSearch}
            list={sortOptions}
           />
           <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>clear filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer;
