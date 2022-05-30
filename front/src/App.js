import { useState } from 'react';
import './App.css';
import UserCreator from './user-creator/user-creator';
import UserSearcher from './user-searcher/user-searcher';


function App() {
  const [user, setUser] = useState({login: '', password: '', age: 10, id: ''});

  return (
    <main className="main-container">
      <UserSearcher onFind={setUser}/>
      <UserCreator user={user}/>
    </main>
  );
}

export default App;
