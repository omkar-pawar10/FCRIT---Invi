import LearnHubPath from '../../components/worlds/LearnHubPath';

export const metadata = {
  title: 'Knowledge Academy | Nivesa',
  description: 'Curated institutional primers and scenario assessments covering REITs, InvITs, Bonds, and Gold.',
};

export default function LearnHubPage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-4">
      <LearnHubPath />
    </div>
  );
}
