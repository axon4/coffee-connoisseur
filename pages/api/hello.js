// Next API Route Support: https://nextjs.org/docs/api-routes/introduction

export default function handler(request, response) {
	response.status(200).json({name: 'John Doe'});
};