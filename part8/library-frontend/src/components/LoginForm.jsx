import { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import LOGIN from '../graphql/mutations/login';

const LoginForm = ({ setToken, show, setPage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const client = useApolloClient();

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            setPage('authors');
            localStorage.setItem('phonenumbers-user-token', token);
            client.resetStore();
        }
    }, [result.data]); //eslint-disable-line

    const submit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
        setUsername('');
        setPassword('');
    };

    if (!show) {
        return null;
    }

    return (
        <form onSubmit={submit}>
            <div>
                username
                <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    );
};
export default LoginForm;
