/** biome-ignore-all lint/correctness/noUnusedVariables: is not necessary use these variables */
import { faker } from '@faker-js/faker';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const seed = async () => {
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();

	for (let i = 0; i < 10; i++) {
		const user = await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				posts: {
					create: [
						{
							title: faker.lorem.sentence(),
							content: faker.lorem.paragraphs(3),
							published: faker.datatype.boolean(),
						},
						{
							title: faker.lorem.sentence(),
							content: faker.lorem.paragraphs(3),
							published: faker.datatype.boolean(),
						},
					],
				},
			},
		});
	}
};

seed()
	.then(() => {
		console.log('database seeded 🌱');
	})
	.catch((error) => {
		console.error('error on seed database:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
