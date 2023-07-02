import prisma from '../../../lib/prisma';

// POST /api/post
export default async function handle(req, res) {
  const data = req.body;

  //const session = await getSession({ req });

  if (req.method === 'POST')
  {
    const result = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
      //   author: { connect: { email: session?.user?.email } },
        author: { connect: { email: 'mateus.schmitz7@hotmail.com' } }
      }
    });

    res.json(result);
  } 
  else if (req.method === 'PUT')
  {
    const result = await prisma.post.update({
      where: { id: data.id },
      data: {
          title: data.title,
          content: data.content
      }
    });

    res.json(result);
  }
}