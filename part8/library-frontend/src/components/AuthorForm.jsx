import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
const AuthorForm = () => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [updateAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
    });
    const result = useQuery(ALL_AUTHORS);

    if (result.loading) return <div>loading...</div>;

    const authors = result.data.allAuthors;

    const submit = async (event) => {
        event.preventDefault();
        updateAuthor({ variables: { name, setBornTo: born } });
        setName('');
        setBorn('');
    };
    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    name
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                        {authors.map((a) => (
                            <option key={a.name}>{a.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(Number(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    );
};

export default AuthorForm;
