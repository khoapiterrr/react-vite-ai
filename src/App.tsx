import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRoutes from './routes';
import Login from './pages/auth/Login';
import { FormSelectExample } from './components/Select/FormSelectExample';
import { MultiSelectExample } from './components/Select/MultiSelectExample';
import { MultiSelectWithConfirmExample } from './components/Select/MultiSelectWithConfirmExample';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter>
        <AppRoutes />
      </BrowserRouter> */}
      <Login />
      <FormSelectExample/>
      <MultiSelectExample />
      <MultiSelectWithConfirmExample />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
