
import Wrapper from '../assets/wrappers/PageBtnContainer';
import {useSelector, useDispatch} from 'react-redux';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import {changePage} from '../features/allJobs/allJobsSlice'

const PaginationBtnContainer = () => {
const {numOfPages, page} = useSelector((store)=>store.allJobs);
const dispatch = useDispatch();

const pages = Array.from({length:numOfPages},(_,index)=>{
    return index +1;
})

const prevPage = () =>{
    let newPageNumber =page-1 ;
    if(newPageNumber < 1) {
        newPageNumber = numOfPages;
    }
    dispatch(changePage(newPageNumber));

}

const nextPage = () =>{
    let newPageNumber =page+1 ;
  if(newPageNumber > numOfPages ) {
    newPageNumber = 1;
  }
    dispatch(changePage(newPageNumber));

}
  return (
    <Wrapper>
        <button type='button' className='prev-btn' onClick={prevPage}><HiChevronDoubleLeft /> </button>
        <div className='btn-container'>
        {pages.map((pageNumber, index)=>{
            return (<button type='button' key={index} className={(page===pageNumber)?'pageBtn active':'pageBtn'}
            onClick={()=>dispatch(changePage(pageNumber))}
            >{pageNumber}</button>);
        })}
            
        </div>
        <button type='button' className='next-btn' onClick={nextPage}><HiChevronDoubleRight/> </button>
    </Wrapper>
  )
}

export default PaginationBtnContainer
