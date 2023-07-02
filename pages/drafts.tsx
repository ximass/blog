import React from 'react';
import { GetServerSideProps } from 'next';
//import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //const session = await getSession({ req });
  const session = true;
  
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      //author: { email: session.user.email },
      author: { email: 'mateus.schmitz7@hotmail.com' },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  //const { data: session } = useSession();
  const session = true;

  if (!session) {
    return (
      <Layout>
        <h1>Meus rascunhos</h1>
        <div>Você precisa estar autenticado para visualizar esta página!</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Meus rascunhos</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;