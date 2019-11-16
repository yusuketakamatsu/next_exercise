import Layout from '../components/MyLayout';
import Link from 'next/Link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://hogehoge.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
