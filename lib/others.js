const somematch = ( data, id ) => {
	let res = data.find(el => el === id )
	return res ? true : false;
}

export {
	somematch
}
