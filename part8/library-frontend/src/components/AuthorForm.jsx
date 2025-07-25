import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import ALL_AUTHORS from '../graphql/queries/allAuthors';
import EDIT_AUTHOR from '../graphql/mutations/editAuthor';
const AuthorForm = () => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [updateAuthor] = useMutation(EDIT_AUTHOR, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
        update: (cache, response) => {
            cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => ({
                allAuthors: allAuthors.map((a) => {
                    if (a.name === response.data.editAuthor.name) {
                        return {
                            ...a,
                            born: response.data.editAuthor.born,
                        };
                    }
                    return a;
                }),
            }));
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
