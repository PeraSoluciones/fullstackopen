import { useState } from 'react';
import { useQuery } from '@apollo/client';
import ALL_BOOKS from '../graphql/queries/allBooks';

const Books = (props) => {
    const [filterGenre, setFilterGenre] = useState(null);
    const result = useQuery(ALL_BOOKS);
    const genres = new Set();

    if (!props.show) return null;

    if (result.loading) return <div>loading...</div>;

    const books = result.data.allBooks;

    books.forEach((b) => b.genres.forEach((g) => genres.add(g)));

    const filteredBooks = filterGenre
        ? books.filter((b) => b.genres.includes(filterGenre))
        : books;

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>filter by genre </h3>
            {Array.from(genres).map((g) => (
                <button key={g} onClick={() => setFilterGenre(g)}>
                    {g}
                </button>
            ))}
            <button onClick={() => setFilterGenre(null)}>all genres</button>
        </div>
    );
};

export default Books;
