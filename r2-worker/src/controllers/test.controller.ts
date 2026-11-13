export async function getMedia(request: Request, env: Env) {
	// get a random image
	const randomImageId = Math.floor(Math.random() * (300 - 1 + 1) + 1);
	const mediaPlaceHolder = await fetch(`https://picsum.photos/id/${randomImageId}/200/300`);
	// return the random image to the user
	return mediaPlaceHolder;
}

export async function getTodo(request: Request, env: Env) {
	// fetch some JSON from an API
	const postPlaceHolder = await fetch('https://jsonplaceholder.typicode.com/todos/1');
	// format the JSON and return with correct headers
	return new Response(JSON.stringify(await postPlaceHolder.json()), {
		headers: { 'Content-Type': 'application/json' },
	});
}
