// pages/p/[id].tsx

import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
//import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function editPost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  //const { data: session, status } = useSession();
  const session = true;
  const status = null;

  if (status === 'loading') {
    return <div>Autenticando...</div>;
  }

  const [title, setTitle]     = useState(props.title);
  const [content, setContent] = useState(props.content);
  const id                    = props.id;

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      //const body = { title: title, content: content, id: id};

      const body = { title, content, id};
      
      await fetch(`/api/post`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const userHasValidSession = Boolean(session);
  //const postBelongsToUser = session?.user?.email === props.author?.email;
  const postBelongsToUser = 'mateus.schmitz7@hotmail.com';

  console.log(props);

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Post</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Salvar" />
          {
          !props.published && userHasValidSession && postBelongsToUser && (
            <button onClick={() => publishPost(props.id)}>Publicar</button>
          )
          }
          {
            userHasValidSession && postBelongsToUser && (
              <button onClick={() => deletePost(props.id)}>Excluir</button>
            )
          }
          <a className="back" href="#" onClick={() => Router.push('/')}>
            Cancelar
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;