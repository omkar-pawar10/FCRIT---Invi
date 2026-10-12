import React, { Suspense } from 'react';
import QuizTopicClient from '../../../../components/worlds/QuizTopicClient';

export function generateStaticParams() {
  return [
    { topic: 'reits' },
    { topic: 'invits' },
    { topic: 'bonds' },
    { topic: 'gold' },
  ];
}

interface PageProps {
  params: Promise<{ topic: string }>;
}

export default async function QuizTopicPage({ params }: PageProps) {
  const resolvedParams = await params;
  const topic = resolvedParams?.topic || 'reits';

  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-400">
          Loading scenario assessment...
        </div>
      }
    >
      <QuizTopicClient topic={topic} />
    </Suspense>
  );
}
