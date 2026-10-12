import EtlVisualizer from '../../components/worlds/EtlVisualizer';

export const metadata = {
  title: 'Data Normalization Pipeline | Unified Wealth Hub',
  description: 'Client-side ingestion pipeline showing parsing, validation, normalization, and ISIN resolution.',
};

export default function PitStopPage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-4">
      <EtlVisualizer />
    </div>
  );
}
