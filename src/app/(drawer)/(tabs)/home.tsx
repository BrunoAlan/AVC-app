import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Menu, Terminal } from 'lucide-react-native';
import { View, Text } from 'react-native';
const Home = () => {
    return (
        <View>
            <Text>Home screen</Text>
            <Alert className='max-w-xl'>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can use a terminal to run commands on your computer.
                </AlertDescription>
            </Alert>
            <Alert
                icon={AlertTriangle}
                variant='destructive'
                className='max-w-xl'
            >
                <AlertTitle>Danger!</AlertTitle>
                <AlertDescription>
                    High voltage. Do not touch. Risk of electric shock. Keep
                    away from children.
                </AlertDescription>
            </Alert>
        </View>
    );
};
export default Home;
