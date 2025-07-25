import { gql } from '@apollo/client';
import BOOK_DETAILS from '../fragments/bookDetails';

export const ADDED_BOOK = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`;

export default ADDED_BOOK;
