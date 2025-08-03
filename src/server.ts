import { server } from './app';

server.listen({ port: 3333 }).then(() => {
	console.log('🚀 server is running on http://localhost:3333');
});
