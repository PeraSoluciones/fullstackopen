const Book = require('../../models/book');

// Función que agrupa las consultas de conteo de libros
const batchBookCounts = async (authorIds) => {
    console.log('Executing batchBookCounts for authorIds:', authorIds);
    // 1. Hacemos una única consulta a la colección de libros usando $in
    const books = await Book.find({ author: { $in: authorIds } });

    // 2. Creamos un mapa para contar los libros por autor
    const counts = {};
    authorIds.forEach((id) => (counts[id.toString()] = 0)); // Inicializamos
    books.forEach((book) => {
        counts[book.author.toString()]++;
    });

    // 3. Devolvemos un array de conteos en el mismo orden que los authorIds de entrada
    return authorIds.map((id) => counts[id.toString()]);
};

module.exports = { batchBookCounts };
