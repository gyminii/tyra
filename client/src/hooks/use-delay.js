import { useEffect, useState } from "react";

const useDelay = (isLoading, delay) => {
	const [delayedLoading, setDelayedLoading] = useState(false);
	useEffect(() => {
		let timerId;

		if (isLoading) {
			setDelayedLoading(true); // Set delayedLoading to true immediately when isLoading is true
		} else if (!isLoading && delayedLoading) {
			timerId = setTimeout(() => setDelayedLoading(false), delay);
		}

		return () => clearTimeout(timerId);
	}, [isLoading, delay, delayedLoading]);

	return delayedLoading;
};

export default useDelay;
