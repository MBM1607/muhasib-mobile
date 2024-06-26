import { usePathname } from "expo-router";

import { ErrorPage } from "../../components/layout/error-page.component.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";

const NotFound = () => {
	const pathname = usePathname();

	const { content } = useI18n();

	return (
		<ErrorPage
			title={content.pages.notFound}
			message={content.pathNotFound(pathname)}
		/>
	);
};

export default NotFound;
