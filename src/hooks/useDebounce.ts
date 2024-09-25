import { type DependencyList, useEffect, type EffectCallback } from "react";

const useDebounce = (
	cb: EffectCallback,
	delay: number,
	deps?: DependencyList
) => {
	useEffect(() => {
		let cleanupFunction: ReturnType<typeof cb>;

		const handler = setTimeout(() => {
			cleanupFunction = cb?.();
		}, delay);

		return () => {
			clearTimeout(handler);
			cleanupFunction?.();
		};
	}, deps);
};

export default useDebounce;
