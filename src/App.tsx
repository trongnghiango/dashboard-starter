import { Provider as ReduxProvider } from 'react-redux';
import store from './app/store';
import AppProvider from './providers';
import AppRouter from './routes';
export default function App() {
  return (
    <AppProvider>
      <ReduxProvider store={store}>
        <AppRouter />
      </ReduxProvider>
    </AppProvider>
  );
}
