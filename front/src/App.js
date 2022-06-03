import './App.css';
import { useState } from 'react';
import UserCreator from './user-creator/user-creator';
import UserSearcher from './user-searcher/user-searcher';
import GroupCreator from './group-creator/group-creator';
import GroupSearcher from './group-sercher/group-sercher';
import GroupAll from './group-all/group-all';
import Linker from './linker/linker';
import Login from './login/login';

function App() {
    const [user, setUser] = useState({ login: '', password: '', age: 10, id: '' });
    const [group, setGroup] = useState({ id: '', name: '', permissions: [] });

    return (
        <main className="main-container">
            <div className="users-and-groups">
                <section>
                    <h2>User section:</h2>
                    <UserSearcher onFind={setUser} />
                    <UserCreator user={user} />
                </section>
                <section>
                    <h2>Group section:</h2>
                    <GroupSearcher onFind={setGroup} />
                    <GroupCreator group={group} />
                    <br></br>
                    <GroupAll />
                </section>
            </div>
            <Linker />
            <Login />
        </main>
    );
}

export default App;
