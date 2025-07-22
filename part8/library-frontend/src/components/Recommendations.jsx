import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommendations = ({ show }) => {
    const { data: meData, loading: loadingMe } = useQuery(ME);

    // Obtenemos el género favorito de forma segura usando optional chaining.
    const favoriteGenre = meData?.me?.favoriteGenre;

    // La query de libros se saltará automáticamente si favoriteGenre es undefined.
    const { data: booksData, loading: loadingBooks } = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
        skip: !favoriteGenre,
    });

    if (!show) {
        return null;
    }

    // Estado 1: Cargando datos del usuario.
    if (loadingMe) {
        return <div>loading user data...</div>;
    }

    // Estado 2: El usuario no está logueado (me es null) o no tiene género favorito.
    if (!favoriteGenre) {
        return (
            <div>
                <h2>recommendations</h2>
                <p>Could not get recommendations. Are you logged in?</p>
            </div>
        );
    }

    // Estado 3: Cargando los libros recomendados.
    if (loadingBooks) {
        return <div>loading recommendations...</div>;
    }

    const resultBooks = booksData?.allBooks || [];

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favorite genre <b>{favoriteGenre}</b>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {resultBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommendations;
