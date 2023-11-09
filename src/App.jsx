import { useState } from 'react';
import './App.css';
import Layout from './components/MsgBodyPage/Layout';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import SignUp from './All_pages/RegisterPage';
import SignIn from './All_pages/LoginPage';
import Inbox from './components/Inbox';
import { ToastContainer } from 'react-toastify';
import Forget from './All_pages/ForgetPage';
import { Reset } from './All_pages/ResetPage';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from './components/redux-container/slices/emailSlice';
import IndividualMail from './All_pages/IndividualMail';
import DraftPage from './All_pages/DraftPage';
import SendPage from './All_pages/SendPage';
import Important from './All_pages/ImportantPage';
import ErrorPage from './All_pages/ErrorPage';

function App() {
const [token, setToken] = useState(localStorage.getItem('token')||null);

// const logout = () => {
//   localStorage.removeItem('token');
//   setToken('');
// }
  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path='/register' Component={SignUp}/>
          <Route exact path='/' element={<SignIn />}/>
          <Route path='/inbox' element={<Inbox/>}> </Route>
          <Route path='/:type/:msgId' element={<IndividualMail/>}> </Route>
          <Route path='/outbox' element={<SendPage/>}/>
          <Route path='/forget' Component={Forget}/>
          <Route path='/reset/:token' Component={Reset}/>
          <Route path='/draft' Component={DraftPage}/>
          {/* <Route  path='/starred' Component={Starred} /> */}
          <Route  path='/important' Component={Important} />
          <Route path='*' Component={ErrorPage}/>
        </Routes>
      </BrowserRouter>
    <ToastContainer/>
    </div>
  )
}
export default App