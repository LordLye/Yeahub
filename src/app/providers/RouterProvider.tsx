import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/MainLayout';
import React, { Suspense } from 'react';
import { HomePageSkeleton } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found-page';
import { QuestionPageSkeleton } from '@/pages/question';

const HomePageLazy = React.lazy(() => import('@/pages/home').then(module => ({ default: module.HomePage })));
const QuestionPageLazy = React.lazy(() => import('@/pages/question').then(module => ({ default: module.QuestionPage })));

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
                    <Suspense fallback={<QuestionPageSkeleton />}>
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
