import { useCallback, useEffect, useState } from 'react'

import { useLoader } from '@/app/lib/providers/LoaderContext';
import { LOADER_TRANSITION_DURATION } from '@/app/lib/constants';

export function useImagesLoader(imagesUrls: string[]) {
	const [imagesLoaded, setImagesLoaded] = useState<string[]>([])
	const [progress, setProgress] = useState<number>(0)
	const { setIsLoading } = useLoader();

	const handleProgress = useCallback((loadedImagesLength: number) => {
		const nextStep = Math.round((loadedImagesLength / imagesUrls.length) * 100)

		for(let i = progress; i <= nextStep; i++) {
			setProgress(i)
		}
	}, [imagesUrls.length, progress])

	function loadImage(url: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image.src);
			image.onerror = reject;
			image.src = url;
		});
	}

	useEffect(() => {
		async function loadImagesSequentially() {
			if(imagesUrls.length === 0) {
				for(let i = 0; i <= 100; i++) {
					setProgress(i)
				}
			}

      const loadedImagesArray: string[] = [];
      for (const imageUrl of imagesUrls) {
        const image = await loadImage(imageUrl);
        loadedImagesArray.push(image);
				handleProgress(loadedImagesArray.length)
      }
			setImagesLoaded(loadedImagesArray)
		}

		loadImagesSequentially()
	}, [imagesLoaded.length, imagesUrls, setIsLoading, handleProgress])

	useEffect(() => {
		if(progress === 100) {
			setTimeout(() => {
				setIsLoading(false)
			}, LOADER_TRANSITION_DURATION)
		}
	}, [progress, setIsLoading])


	return {
		imagesLoaded: imagesLoaded,
		progress,
	}
}