/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface CustomLegendProps {
    item: any;
    chartElement: any;
    
}

const CustomLegend = ({ item, chartElement }:CustomLegendProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [hideDataSet, setHideDataSet] = useState(false);

  const handleOnClickLegend = (index:any) => {
    setHideDataSet(!hideDataSet);
    if (!hideDataSet) {
      chartElement.setDatasetVisibility(index, false);
      setIsSelected(true);
    } else {
      chartElement.setDatasetVisibility(index, true);
      setIsSelected(false);
    }
    chartElement.update();
  };

  return (
    <div key={item.index} className="flex items-center space-x-2">
      <div
        style={{
          width: '32px',
          height: '12px',
          border: `1.5px solid ${item.strokeStyle}`,
        }}
      ></div>
      <span
        className="text-xs dark:text-white cursor-pointer"
        style={{ textDecorationLine: isSelected ? 'line-through' : 'none' }}
        onClick={() => handleOnClickLegend(item.index)}
      >
        {item.text}
      </span>
    </div>
  );
};

export default CustomLegend;
