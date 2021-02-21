import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import PagenationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return null;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  const pageNum = parseInt(page, 10);
  return (
    <PagenationStyles>
      <Head>
        <title>
          Sick Fits - Page {pageNum} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${pageNum - 1}`}>
        <a aria-disabled={pageNum <= 1}>← Prev</a>
      </Link>
      <p>
        Page {pageNum} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${pageNum + 1}`}>
        <a aria-disabled={pageNum >= pageCount}>Next →</a>
      </Link>
    </PagenationStyles>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
};
