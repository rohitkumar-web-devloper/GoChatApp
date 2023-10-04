import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { Home, Search } from '../Screens';
import { Green, White } from '../Styles/Color';
import ImagePath from '../Constant/ImagePath';
import NavigationStrings from '../Constant/NavigationStrings';
export default Bootom = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarInactiveTintColor: 'gray', tabBarStyle: { height: 60, backgroundColor: White, },
            tabBarLabelStyle: {
                fontSize: 16, fontWeight: 700, color: Green, marginBottom: 6, marginTop: -5,
            },
            headerShown: false,
        }}>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: () => <ImagePath.Message />,
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name={NavigationStrings.SEARCH}
                component={Search}
                options={{
                    tabBarIcon: () => <ImagePath.Message />,
                    tabBarLabel: 'Search',
                }}
            />
        </Tab.Navigator>
    );
};