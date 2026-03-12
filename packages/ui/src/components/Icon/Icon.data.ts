/// <reference types="vite/client" />
import {
	OPEN_ICON_NAME_TO_FILE,
	resolveOpenIconName,
} from 'open-icon-svg';

type Loader = () => Promise<string>;
type SvgImporter = () => Promise<string>;

const svgModules = import.meta.glob('/node_modules/open-icon-svg/icons/**/*.svg', {
	query: '?open-icon',
	import: 'default',
}) as Record<string, SvgImporter>;

const svgImportersByFilePath = (() => {
	const map = new Map<string, SvgImporter>();
	const packageSegment = '/open-icon-svg/';

	Object.entries(svgModules).forEach(([modulePath, importer]) => {
		const segmentIndex = modulePath.lastIndexOf(packageSegment);
		if (segmentIndex < 0) {
			return;
		}

		const relativeFilePath = modulePath.slice(segmentIndex + packageSegment.length);
		if (!map.has(relativeFilePath)) {
			map.set(relativeFilePath, importer);
		}
	});

	return map;
})();

const loaderCache = new Map<string, Loader>();

const resolveSvgImporter = (iconName: string): SvgImporter | null => {
	const canonicalName = resolveOpenIconName(iconName);
	if (!canonicalName) {
		return null;
	}

	const filePath = OPEN_ICON_NAME_TO_FILE[canonicalName];
	if (!filePath) {
		return null;
	}

	return svgImportersByFilePath.get(filePath) ?? null;
};

const createLoader = (iconName: string): Loader => {
	return async () => {
		const importer = resolveSvgImporter(iconName);
		if (!importer) {
			return '';
		}

		try {
			return await importer();
		} catch {
			return '';
		}
	};
};

export const getIconLoader = (iconName: string): Loader => {
	if (loaderCache.has(iconName)) {
		return loaderCache.get(iconName)!;
	}

	const loader = createLoader(iconName);
	loaderCache.set(iconName, loader);
	return loader;
};
