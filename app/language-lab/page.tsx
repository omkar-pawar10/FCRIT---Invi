import { Suspense } from 'react';
import ChatEducator from '../../components/worlds/ChatEducator';

export const metadata = {
  title: 'Wealth Assistant | Unified Wealth Hub',
  description: 'Multilingual conversational wealth educator with strict SEBI-aligned guardrails and regulatory citations.',
};

export default function LanguageLabPage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-2">
      <Suspense fallback={<div className="p-12 text-center text-xs font-mono text-zinc-500">Loading Wealth Assistant...</div>}>
        <ChatEducator />
      </Suspense>
    </div>
  );
}
