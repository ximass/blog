import prisma from '../../../lib/prisma';

// POST /api/post
export default async function handle(req, res) {
  const data = req.body;

  //const session = await getSession({ req });

  if (req.method === 'POST')
  {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password
      }
    });

    if (user)
    {
        res.status(200).json('Sucesso!');
    }

    res.status(401).json('Falha de autenticação!');
  }
}