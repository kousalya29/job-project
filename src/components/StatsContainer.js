import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatsItems from './StatsItems';
import {useSelector} from 'react-redux';

const StatsContainer = () => {
    const {stats} = useSelector((store)=>store.allJobs);
    
    const statsItems = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
        {statsItems.map((stats,index)=>{
            return <StatsItems key={index} {...stats} />;
        })} 
    </Wrapper>
  )
}

export default StatsContainer
