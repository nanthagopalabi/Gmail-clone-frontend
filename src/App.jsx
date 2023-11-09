import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import SignUp from './All_pages/RegisterPage';
import SignIn from './All_pages/LoginPage';
import Inbox from './components/Inbox';
import { ToastContainer } from 'react-toastify';
import Forget from './All_pages/ForgetPage';
import { Reset } from './All_pages/ResetPage';
import IndividualMail from './All_pages/IndividualMail';
import DraftPage from './All_pages/DraftPage';
import SendPage from './All_pages/SendPage';
import Important from './All_pages/ImportantPage';
import StarredPage from './All_pages/StarredPage';
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
          <Route path='/GetDraft' Component={DraftPage}/>
          <Route  path='/starred' Component={StarredPage} />
          <Route  path='/important' Component={Important} />
          <Route path='*' Component={ErrorPage}/>
        </Routes>
      </BrowserRouter>
    <ToastContainer/>
    </div>
  )
}
export default App