import { FluentProvider } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';
import { appTheme } from '../styles/theme';
import { ToastProvider } from './providers/ToastProvider';
import { GlobalErrorBoundary } from '../components/common/GlobalErrorBoundary';
import { AppRoutes } from './routes';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});


export function App() {
  return (
    <FluentProvider theme={appTheme} style={{ width: '100%', height: '100%' }}>
      <QueryClientProvider client={queryClient}>
        <GlobalErrorBoundary>
          <ToastProvider>
            <HashRouter>
              <AppRoutes />
            </HashRouter>
          </ToastProvider>
        </GlobalErrorBoundary>
      </QueryClientProvider>
    </FluentProvider>
  );
}

export default App;


// import { FluentProvider } from '@fluentui/react-components';
// import {
//   MutationCache,
//   QueryCache,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';
// import { HashRouter } from 'react-router-dom';
// import { appTheme } from '../styles/theme';
// import { ToastProvider } from './providers/ToastProvider';
// import { GlobalErrorBoundary } from '../components/common/GlobalErrorBoundary';
// import { AppRoutes } from './routes';

// const queryClient = new QueryClient({
//   queryCache: new QueryCache({
//     onError: (error, query) => {
//       const sdkError = error as {
//         message?: string;
//         status?: number;
//         requestId?: string;
//       };

//       console.error(
//         '[Global Query Error] Query Key:',
//         JSON.stringify(query.queryKey),
//       );

//       console.error(
//         '[Global Query Error] Status:',
//         sdkError.status,
//       );

//       console.error(
//         '[Global Query Error] Request ID:',
//         sdkError.requestId,
//       );

//       console.error(
//         '[Global Query Error] Raw Message:',
//         sdkError.message ?? String(error),
//       );

//       if (sdkError.message) {
//         try {
//           const parsed = JSON.parse(sdkError.message) as {
//             error?: {
//               code?: string;
//               message?: string;
//             };
//           };

//           console.error(
//             '[Global Query Error] Dataverse Code:',
//             parsed.error?.code,
//           );

//           console.error(
//             '[Global Query Error] Dataverse Message:',
//             parsed.error?.message,
//           );
//         } catch {
//           console.error(
//             '[Global Query Error] Message is not JSON:',
//             sdkError.message,
//           );
//         }
//       }
//     },
//   }),

//   mutationCache: new MutationCache({
//     onError: (error, variables, context, mutation) => {
//       console.error('[Global Mutation Error]', {
//         mutationKey: mutation.options.mutationKey,
//         variables,
//         context,
//         error,
//       });
//     },
//   }),

//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false,
//     },
//   },
// });

// export function App() {
//   return (
//     <FluentProvider
//       theme={appTheme}
//       style={{ width: '100%', height: '100%' }}
//     >
//       <QueryClientProvider client={queryClient}>
//         <GlobalErrorBoundary>
//           <ToastProvider>
//             <HashRouter>
//               <AppRoutes />
//             </HashRouter>
//           </ToastProvider>
//         </GlobalErrorBoundary>
//       </QueryClientProvider>
//     </FluentProvider>
//   );
// }

// export default App;