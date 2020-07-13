export default function createCustomEvent(name, objWord) {
	const customEvent = new CustomEvent(
		name, {
			detail: objWord,
		}
	);
	return customEvent;
}
