import { HijriDateControl } from "../../../components/controls/hijri-date-control";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { MetaAppOptions } from "../../../components/settings/meta-app-options";
import { useI18n } from "../../../contexts/i18n.context";

const CalendarSettings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.calendarSettings}
			style={{
				paddingHorizontal: 16,
				gap: 8,
				paddingTop: 16,
				justifyContent: "space-between",
			}}
			back
		>
			<HijriDateControl />
			<MetaAppOptions />
		</ScreenWrapper>
	);
};

export default CalendarSettings;
