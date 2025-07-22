import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(
        localStorage.getItem('phonenumbers-user-token')
    );
    const client = useApolloClient();

    const logout = () => {
        setToken(null);
        localStorage.removeItem('phonenumbers-user-token');
        // client.clearStore();
        client.resetStore();
        setPage('authors');
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && (
                    <button onClick={() => setPage('add')}>add book</button>
                )}
                {token && (
                    <button onClick={() => setPage('recommend')}>
                        recommend
                    </button>
                )}
                <button
                    onClick={() => {
                        token ? logout() : setPage('login');
                    }}
                >
                    {token ? 'logout' : 'login'}
                </button>
            </div>

            <Authors show={page === 'authors'} token={token} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <LoginForm
                setToken={setToken}
                show={page === 'login'}
                setPage={setPage}
            />

            <Recommendations show={page === 'recommend'} />
        </div>
    );
};

export default App;
