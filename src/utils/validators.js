const nameValid = (name) => {
	return name?.toString().length > 2;
}

const emailValid = (email) => {
	const emailS = email?.toString()
	return emailS.length > 5 && emailS.includes('@') && emailS.includes('.');
}

const passwordValid = (password) => {
	return password?.toString().length > 3;
}

const passConfValid = (password, passConf) => {
	return passwordValid(password) && password === passConf
}

const biosValid = (bio) => {
	return bio?.toString().length < 300;
}

const postContentValid = (postContent) => {
	return postContent?.toString().length < 1000;
}

export {
	nameValid,
	emailValid,
	passwordValid,
	passConfValid,
	biosValid,
	postContentValid
}