import React, { useMemo, useState } from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getPieces = ({ data, onShowTips }) => {
  let totalValue = 0;
  for (let i = 0; i < data.length; i++) {
    totalValue += +data[i].value;
  }
  let prevPersentage = 0;
  return data.map((item, i) => {
    console.log('map');
    const strokeStartOffset = prevPersentage;
    const percentage = (item.value / totalValue) * 100;
    const percentage1 = percentage;
    const percentage2 = 100 - percentage1;
    prevPersentage = percentage + prevPersentage;
    return (
      <circle
        key={`${i}-circle`}
        onMouseEnter={(e) => onShowTips(e.clientX, e.clientY, item.name, item.value)}
        r={'25%'}
        cx={'50%'}
        cy={'50%'}
        strokeDashoffset={strokeStartOffset + percentage}
        stroke={getRandomColor()}
        fill={'transparent'}
        strokeWidth={'50%'}
        strokeDasharray={`${percentage1} ${percentage2}`}
      >
      </circle>
    );
  })
};

const PieChart = ({ data }) => {
  const [ tip, setTip ] = useState({
    isVisible: null,
    x: 0,
    y: 0,
  });

  const onShowTips = (x, y, name, value) => {
    setTip({
      isVisible: true,
      x,
      y,
      name,
      value,
    });
  };

  const onHideTips = () => {
    setTip({
      isVisible: false,
      x: 0,
      y: 0,
      name: '',
      value: '',
    });
  };
  const pieces = useMemo(() => getPieces({ data, onShowTips }), [data]);
  return (
    <div
      onMouseMove={(e) => tip.name && onShowTips(e.clientX, e.clientY, tip.name, tip.value)}
      onMouseOut={onHideTips}
    >
      { tip.isVisible &&
      <div
        style={{
          top: tip.y + 50,
          left: tip.x,
        }}
        className={'tip'}
      >
        <p>{`${tip.name}: ${tip.value}`}</p>
      </div>
      }
      <svg
        viewBox={'0 0 64 64'} className="pie"
      >
        { pieces }
      </svg>
    </div>
  );
};

export default PieChart;
