import Reactotron from 'reactotron-react-native'

Reactotron
    .configure({lan: 'exp://localhost:19000'})  
    .useReactNative()
    .use(reduxPlugin())
    .connect();
