import { gql } from '@apollo/client';
import BOOK_DETAILS from '../fragments/bookDetails';

const ALL_BOOKS = gql`
    query ($genre: String) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`;

export default ALL_BOOKS;
