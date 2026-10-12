import BaseCampConsent from '../../components/worlds/BaseCampConsent';

export const metadata = {
  title: 'Data Sources & Consent | Unified Wealth Hub',
  description: 'Consent-based multi-broker onboarding, e-CAS PDF ingestion, and investor profile selection.',
};

export default function BaseCampPage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-4">
      <BaseCampConsent />
    </div>
  );
}
