export const hey = (message) => {
	const is_question = /\?\s*$/.test(message);
	const is_nothing = /^\s*$/.test(message);
	const is_yelling = /[A-Z]{2,}/.test(message) && message.toUpperCase() == message;

	if (is_nothing) {
		return 'Fine. Be that way!';
	}
	else if (is_question) {
		if (is_yelling) {
			return 'Calm down, I know what I\'m doing!';
		}
		else {
			return 'Sure.';
		}
	}
	else if (is_yelling) {
		return 'Whoa, chill out!';
	}
	else {
		return 'Whatever.';
	}
};
