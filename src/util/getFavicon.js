export function getFavicon(path) {
	let newPath = path.split('/');
	let [host, , link,] = newPath;
	newPath = `${host}//${link}/`
	console.log(newPath);

	// fetch(newPath).then(response => {
	// 	console.log(response); // объект класса Response
	// });



	// return newPath + 'favicon.ico'
	return ' favicon.yandex.net/favicon/' + newPath
}