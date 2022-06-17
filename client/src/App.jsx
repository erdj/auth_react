import { useEffect, useContext, useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import {observer} from 'mobx-react-lite'
import UserService from './services/UserService';

const App =  observer(() => {
 
  const {store} = useContext(Context)
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()      
    }
  }, [])
  
  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      if (users.length !== 0) {
        setUsers([])
      } else {
        setUsers(response.data);
      }
    } catch (e) {
      console.log(e);
    }    
  }
  
  if (store.isLoading) {
    return <div>Загрузка...</div>
  }
  
  if (!store.isAuth) {
    return (
      <div>
        <LoginForm getUsers={getUsers}/>
      </div>
    )    
  }
  
  return (
    <div className="App">
      <div className="app_container">
        <div className="app_content">
          <h1>{store.isAuth ? <div>Пользователь авторизирован: <span>{store.user.email}</span></div> : `авторизирйтесь`}</h1>
          <h1>{store.user.isActivated ? `Аккаунт потвержден на почет` : `Аккаунт не потверждён`}</h1>
          <button className='app_button' onClick={() => store.logout()}><span>Выйти</span><i></i></button>
            <button className='app_button' onClick={getUsers}><span>Получить пользователей</span><i></i></button>
        </div>
        <div className='app_users'>
          {users.map(user => {
            return <div className='app_users-item' key={user.email}>{user.email}</div>
          })}
        </div>
      </div>
    </div>
  );
})

export default App;
