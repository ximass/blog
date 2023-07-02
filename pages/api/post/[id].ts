import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req, res) {
    const parametros = req.query;
    res.json(req.query.title + 'teste');


    if (req.method === 'DELETE') {
        const post = await prisma.post.delete({
            where: { id: parametros.id },
        });

        res.json(post);
    } else if (req.method === 'PUT') {
        const post = await prisma.post.update({
            where: { id: parametros.id },
            data: {
                title: parametros.title,
                content: parametros.content
            }
        });

        res.json(parametros);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}