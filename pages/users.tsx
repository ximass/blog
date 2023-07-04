import React from 'react';
import { GetServerSideProps } from 'next';
//import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import User, { UserProps } from '../components/User';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //const session = await getSession({ req });
  const session = true;
  
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const users = await prisma.user.findMany();
  
  return {
    props: { 
      users: JSON.parse(JSON.stringify(users))
    }
  };
};

type Props = {
  users: UserProps[];
};

const Users: React.FC<Props> = (props) => {
  const session = true;

  return (
    <Layout>
      <div className="page">
        <h1>Usuários</h1>
        <main>
          {props.users.map((user) => (
            <div key={user.id} className="post">
              <User user={user} />
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

export default Users;