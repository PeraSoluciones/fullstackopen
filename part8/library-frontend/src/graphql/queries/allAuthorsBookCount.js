import { gql } from '@apollo/client';

const ALL_AUTHORS_BOOK_COUNT = gql`
    query {
        allAuthors {
            name
            bookCount
        }
    }
`;
export default ALL_AUTHORS_BOOK_COUNT;
