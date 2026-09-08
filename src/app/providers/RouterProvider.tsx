import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/MainLayout';
import React, { Suspense } from 'react';
import { HomePageSkeleton } from '@/pages/Home'; 
import { QuestionCardSkeleton } from '@/entities/questions/ui/QuestionCardSkeleton';
import { NotFoundPage } from '@/pages/NotFoundPage';

const HomePageLazy = React.lazy(() => import('@/pages/Home').then(module => ({ default: module.HomePage })));
const QuestionPageLazy = React.lazy(() => import('@/pages/Question').then(module => ({ default: module.QuestionPage })));


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
            {
                path: '/questions/:id',
                element: (
                    <Suspense fallback={<QuestionCardSkeleton />}>
                        <QuestionPageLazy />
                    </Suspense>
                )
            },
            {
                path: '*', 
                element: <NotFoundPage />
            },
        ],
    },
]);

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />;
};
