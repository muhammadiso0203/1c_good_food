import React from 'react';
import KpiCards from '../../../components/dashboard/KpiCards';
import RasIfrsComparisonChart from '../../../components/dashboard/RasIfrsComparisonChart';
import AutomationLevelChart from '../../../components/dashboard/AutomationLevelChart';
import MainAdjustmentsChart from '../../../components/dashboard/MainAdjustmentsChart';
import AdjustmentsAndStatus from '../../../components/dashboard/AdjustmentsAndStatus';

const Raschet: React.FC = () => {
  return (
    <div className="w-full flex flex-col pb-10">
      <KpiCards />

      <div className="w-full grid grid-cols-2 gap-6 mt-6">
        <RasIfrsComparisonChart />
        <AutomationLevelChart />
      </div>
      <div className='mt-6'>

        <MainAdjustmentsChart />
        <AdjustmentsAndStatus />
      </div>
    </div>
  );
};

export default Raschet;

