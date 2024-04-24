import { createStackNavigator } from '@react-navigation/stack';
import { ClaimList, ClaimDetail } from '../Components/Claims';
import { useTheme } from '@rneui/themed';
import { Platform } from 'react-native';
import { IssueCreated, NewIssue } from '../Components/Claims/Issues';
import { PolicyList } from '../Components/Policy/PolicyList';
const Stack = createStackNavigator();

export const ClaimView =()=>{
    const { theme } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerTintColor: theme.colors.primary,
                headerStyle: { height: 80 }
            }}>
        <Stack.Screen 
            name='claim' 
            component={ ClaimList }
            options={{ headerShown: false }}/>
        <Stack.Screen
            name='detail'
            component={ ClaimDetail }
            options={{ 
                headerTitle: Platform.OS == 'android' ? 'My Claims': '',
                headerBackTitle: 'My Claims'}}/>
        <Stack.Screen
            name='newIssue'
            component={NewIssue}
            options={{
                headerTitle: Platform.OS == 'android' ? 'New Issue': '',
                headerBackTitle: 'New Issue'}}/>
        <Stack.Screen
            name='searchPolicy'
            component={PolicyList}
            options={{
                headerTitle: Platform.OS == 'android' ? 'Search Policy': '',
                headerBackTitle: 'Search Policy'}}/>
        <Stack.Screen
            name='issueCreated'
            component={ IssueCreated }
            options={{
                headerTitle: Platform.OS == 'android' ? 'Issue Created': '',
                headerBackTitle: 'Issue Created'}}/>
        </Stack.Navigator>)
}