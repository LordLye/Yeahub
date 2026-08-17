import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/MainLayout';
import React, { Suspense } from 'react';
import { HomePageSkeleton } from '@/pages/Home'; 

const HomePageLazy = React.lazy(() => import('@/pages/Home').then(module => ({ default: module.HomePage })));


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<HomePageSkeleton />}>
                        <HomePageLazy />
                    </Suspense>
                )
            },
        ],
    },
]);

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />;
};
