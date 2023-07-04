import prisma from '../../../lib/prisma';

// POST /api/post
export default async function handle(req, res) {
  const data = req.body;

  //const session = await getSession({ req });

  if (req.method === 'POST')
  {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });

    res.json(result);
  } 
  else if (req.method === 'PUT')
  {
    const result = await prisma.user.update({
      where: { id: data.id },
      data: {
          name: data.title,
          email: data.content,
          password: data.password
      }
    });

    res.json(result);
  }
}