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

export {
	nameValid, 
    emailValid, 
    passwordValid, 
    passConfValid
}