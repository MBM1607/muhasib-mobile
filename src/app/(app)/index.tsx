import { Button } from '~/components/controls/button.component';
import { ScreenWrapper } from '~/components/layout/screen-wrapper.component';
import { logout } from '~/contexts/auth.context';
import { useI18n } from '~/contexts/i18n.context';

const App = () => {
	const { content } = useI18n();
	return (
		<ScreenWrapper
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Button
				icon='logout'
				label={content.action.logout}
				onPress={() => {
					logout();
				}}
			/>
		</ScreenWrapper>
	);
};

export default App;
