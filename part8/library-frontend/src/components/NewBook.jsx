import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ME } from '../queries';

const NewBook = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    const [addBook] = useMutation(ADD_BOOK, {
        onError: (error) => {
            console.log(error);
        },

        update: (cache, response) => {
            const addedBook = response.data.addBook;

            // Función auxiliar para actualizar la caché de forma segura
            const updateCacheWith = (newBook) => {
                const updateCacheForQuery = (variables) => {
                    try {
                        // 1. Leer la consulta con las variables específicas
                        const dataInStore = cache.readQuery({
                            query: ALL_BOOKS,
                            variables,
                        });

                        if (dataInStore) {
                            // 2. Si existe, escribir la versión actualizada
                            cache.writeQuery({
                                query: ALL_BOOKS,
                                variables,
                                data: {
                                    allBooks:
                                        dataInStore.allBooks.concat(newBook),
                                },
                            });
                        }
                    } catch (e) {
                        // La consulta no está en la caché, lo cual es esperado.
                        // No es necesario hacer nada.
                        console.log(
                            `Query with variables ${JSON.stringify(
                                variables
                            )} not found in cache. Skipping update.`
                        );
                    }
                };

                // A. Actualizar la consulta general (sin filtro de género)
                updateCacheForQuery(undefined); // o undefined, dependiendo de cómo se llame sin filtro

                // B. Actualizar la caché para cada género del libro nuevo
                const dataMe = cache.readQuery({ query: ME });
                newBook.genres.forEach((genre) => {
                    if (dataMe.me.favoriteGenre === genre) {
                        updateCacheForQuery({ genre });
                    }
                });

                // C. Actualizar la lista de autores
                try {
                    const { allAuthors } = cache.readQuery({
                        query: ALL_AUTHORS,
                    });
                    // Verirficar si ya existe el autor
                    const authorInStore = allAuthors.some(
                        (a) => a.name === newBook.author.name
                    );

                    cache.writeQuery({
                        query: ALL_AUTHORS,
                        data: {
                            allAuthors: authorInStore
                                ? allAuthors.map((a) => {
                                      if (a.name === newBook.author.name) {
                                          return {
                                              ...a,
                                              bookCount: a.bookCount + 1,
                                          };
                                      }
                                      return a;
                                  })
                                : allAuthors.concat(newBook.author),
                        },
                    });
                    return;
                } catch (e) {
                    console.log(
                        'AllAuthors query not found in cache. Skipping update.'
                    );
                }
            };

            updateCacheWith(addedBook);
        },
    });

    if (!props.show) return null;
    const submit = async (event) => {
        event.preventDefault();

        console.log('add book...');

        addBook({
            variables: { title, author, published, genres },
        });

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    return (
        <div>
            <h2>New Book</h2>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type='number'
                        value={published}
                        onChange={({ target }) =>
                            setPublished(parseInt(target.value))
                        }
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type='button'>
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type='submit'>create book</button>
            </form>
        </div>
    );
};

export default NewBook;
