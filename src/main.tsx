import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import Root from './pages/root.tsx';
import Home from './pages/Home.tsx';
import MovieList from './components/Home/MovieList.tsx';
import { ROUTER_PATH } from './shared/constants/index.ts';
import { GlobalStyle } from './shared/styles/GlobalStyle.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: ROUTER_PATH.root,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTER_PATH.root,
        element: <Home />,
        children: [
          {
            path: ROUTER_PATH.root,
            element: <MovieList />,
          },
          {
            path: ROUTER_PATH.comingSoon,
            element: <MovieList />,
          },
          {
            path: ROUTER_PATH.nowPlaying,
            element: <MovieList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
