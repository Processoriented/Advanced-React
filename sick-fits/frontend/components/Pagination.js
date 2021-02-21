import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PagenationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

// eslint-disable-next-line react/prop-types
export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return null;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  return (
    <PagenationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {count}
        </title>
      </Head>
      <Link href="/">← Prev</Link>
      <p>Page __ of {count}</p>
      <p>__ Items Total</p>
      <Link href="/">Next →</Link>
    </PagenationStyles>
  );
}
