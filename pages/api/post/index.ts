import prisma from '../../../lib/prisma';

// POST /api/post
export default async function handle(req, res) {
  const { title, content } = req.body;

  //const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
    //   author: { connect: { email: session?.user?.email } },
      author: { connect: { email: 'mateus.schmitz7@hotmail.com' } }
    },
  });

  res.json(result);
}