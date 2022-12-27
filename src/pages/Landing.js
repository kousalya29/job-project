
import main from '../assets/images/main.svg';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Logo}  from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
            <h1>job <span>tracking</span> app</h1>
            <p>job tracking app helps commercial service pros in the field stay on-schedule & access critical job details in a user-friendly interface.</p>
            <Link className='btn btn-hero' to='/register'>Login/Register</Link>

        </div>
        <img src={main} alt='job hunt' className='img main-img'></img>
        <div className='Toastify'></div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
    nav {
        width:var(--fluid-width);
        max-width:var(--max-width);
        margin:0 auto;
        height:var(--nav-height);
        display: flex;
        align-items: center;
    }

    .page {
        min-height: calc(100vh- var(--nav-height));
        display: grid;
        align-items: center;
        
    }
    h1{
        font-weight:700;
    span {
        color: var(--primary-500);
    }
    }
    p{
        color:var(--grey-600);
    }
    .main-img {
        display: none;
    }
    @media (min-width: 992px){
        .page {
            grid-template-columns: 1fr 1fr;
            column-gap:3rem;
        }
        .main-img {
            display: block;
        }
    }
`;

export default Landing;
