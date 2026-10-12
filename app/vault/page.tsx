import PortfolioTable from '../../components/worlds/PortfolioTable';

export const metadata = {
  title: 'Holdings & Accounts | Nivesa',
  description: 'Consolidated view of all direct equities and mutual fund units across brokers and depositories.',
};

export default function VaultPage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-4">
      <PortfolioTable />
    </div>
  );
}
