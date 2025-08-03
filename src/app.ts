import { fastify } from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export const server = fastify({});

const CreateUserBodySchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
});
const CreatePostBodySchema = z.object({
	title: z.string(),
	content: z.string(),
	published: z.boolean(),
	authorId: z.uuid(),
});

server.post('/users', async (request, _reply) => {
	const { name, email, password } = CreateUserBodySchema.parse(request.body);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password,
		},
	});
	return user;
});

server.get('/users', async (_request, _reply) => {
	const users = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});

	return users;
});

server.post('/posts', async (request, _reply) => {
	const { title, content, published, authorId } = CreatePostBodySchema.parse(
		request.body,
	);

	const post = await prisma.post.create({
		data: {
			title,
			content,
			published,
			authorId,
		},
	});

	return post;
});

server.get('/posts', async (_request, _reply) => {
	const posts = await prisma.post.findMany({
		include: {
			author: true,
		},
	});
	return posts;
});
