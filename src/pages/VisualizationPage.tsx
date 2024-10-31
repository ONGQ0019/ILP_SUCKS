import React, { useState, useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { motion } from 'framer-motion';
import { ArrowDown, TrendingUp, DollarSign, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const indexFunds = [
  { id: 'QQQ', name: 'Invesco QQQ (NASDAQ 100)' },
  { id: 'VOO', name: 'Vanguard S&P 500 ETF' },
  { id: 'VTI', name: 'Vanguard Total Stock Market ETF' },
];

const ilps = [
  { id: 'GE', name: 'Great Eastern ILP' },
  { id: 'PRU', name: 'Prudential ILP' },
  { id: 'AIA', name: 'AIA ILP' },
];

const generateData = (initialValue: number, days: number, isILP: boolean) => {
  const data = [];
  let value = initialValue;
  
  for (let i = 0; i < days; i++) {
    // ILPs have higher fees and generally lower returns
    const growth = isILP ? 0.04 : 0.06;
    const fees = isILP ? 0.025 : 0.001;
    value = value * (1 + (Math.random() * growth - fees));
    
    data.push({
      x: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      y: Number(value.toFixed(2)),
    });
  }
  
  return data;
};

const VisualizationPage = () => {
  const [selectedFund, setSelectedFund] = useState(indexFunds[0]);
  const [selectedILP, setSelectedILP] = useState(ilps[0]);
  const [investedAmount, setInvestedAmount] = useState(100000);
  const [timeframe, setTimeframe] = useState(365);
  const [showComparison, setShowComparison] = useState(false);

  const chartData = useMemo(() => [
    {
      id: selectedFund.name,
      data: generateData(investedAmount, timeframe, false),
    },
    {
      id: selectedILP.name,
      data: generateData(investedAmount, timeframe, true),
    },
  ], [selectedFund, selectedILP, investedAmount, timeframe]);

  const stats = useMemo(() => {
    const fundData = chartData[0].data;
    const ilpData = chartData[1].data;
    
    const fundReturn = ((fundData[fundData.length - 1].y - fundData[0].y) / fundData[0].y) * 100;
    const ilpReturn = ((ilpData[ilpData.length - 1].y - ilpData[0].y) / ilpData[0].y) * 100;
    const difference = fundData[fundData.length - 1].y - ilpData[ilpData.length - 1].y;
    const percentageDifference = ((difference / ilpData[ilpData.length - 1].y) * 100);
    
    return {
      fundReturn: fundReturn.toFixed(2),
      ilpReturn: ilpReturn.toFixed(2),
      difference: difference.toFixed(2),
      percentageDifference: percentageDifference.toFixed(2),
    };
  }, [chartData]);

  return (
    <div className="min-h-screen pb-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/"
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
            </Link>
            <h1 className="text-3xl font-bold text-white">
              Index Fund vs ILP Comparison
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-gray-300 mb-2">Select Index Fund</label>
              <select
                value={selectedFund.id}
                onChange={(e) => setSelectedFund(indexFunds.find(f => f.id === e.target.value) || indexFunds[0])}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2
                         focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
                         transition-all duration-300"
              >
                {indexFunds.map((fund) => (
                  <option key={fund.id} value={fund.id}>
                    {fund.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Select ILP</label>
              <select
                value={selectedILP.id}
                onChange={(e) => setSelectedILP(ilps.find(i => i.id === e.target.value) || ilps[0])}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2
                         focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
                         transition-all duration-300"
              >
                {ilps.map((ilp) => (
                  <option key={ilp.id} value={ilp.id}>
                    {ilp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-gray-300 mb-2">Initial Investment ($)</label>
              <input
                type="number"
                value={investedAmount}
                onChange={(e) => setInvestedAmount(Number(e.target.value))}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2
                         focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
                         transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Investment Period (Years): {(timeframe / 365).toFixed(1)}</label>
              <input
                type="range"
                min="30"
                max="3650"
                step="30"
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-4
                         [&::-webkit-slider-thumb]:h-4
                         [&::-webkit-slider-thumb]:bg-emerald-500
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.5)]
                         hover:[&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(16,185,129,0.8)]"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowComparison(true)}
            className="w-full mb-8 px-8 py-4 bg-emerald-500 text-white rounded-lg font-bold text-lg
                     hover:bg-emerald-600 transition-all duration-300
                     shadow-[0_0_15px_rgba(16,185,129,0.5)]
                     hover:shadow-[0_0_30px_rgba(16,185,129,0.8)]"
          >
            Compare
          </motion.button>

          {showComparison && (
            <>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="h-[600px] bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 mb-8"
              >
                <ResponsiveLine
                  data={chartData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                  }}
                  xFormat="time:%Y-%m-%d"
                  yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    format: '%Y',
                    tickValues: 'every 1 year',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Year',
                    legendOffset: 36,
                    legendPosition: 'middle',
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Value ($)',
                    legendOffset: -40,
                    legendPosition: 'middle',
                  }}
                  enablePointLabel={false}
                  pointSize={4}
                  pointColor="white"
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  theme={{
                    axis: {
                      domain: {
                        line: {
                          stroke: '#525252',
                        },
                      },
                      legend: {
                        text: {
                          fill: '#e5e5e5',
                        },
                      },
                      ticks: {
                        line: {
                          stroke: '#525252',
                          strokeWidth: 1,
                        },
                        text: {
                          fill: '#a3a3a3',
                        },
                      },
                    },
                    grid: {
                      line: {
                        stroke: '#2d2d2d',
                      },
                    },
                    legends: {
                      text: {
                        fill: '#e5e5e5',
                      },
                    },
                    tooltip: {
                      container: {
                        background: '#1f1f1f',
                        color: '#e5e5e5',
                      },
                    },
                  }}
                  colors={['#10b981', '#ef4444']}
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 140,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-16"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-emerald-500 flex flex-col items-center gap-2"
                >
                  <span className="text-sm font-medium">Scroll down for more insights</span>
                  <ArrowDown className="w-6 h-6" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
              >
                <div className={`p-6 rounded-xl border ${
                  Number(stats.fundReturn) > 0
                    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                    : 'bg-red-500/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-4">{selectedFund.name}</h3>
                  <p className={`text-3xl font-bold ${
                    Number(stats.fundReturn) > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {Number(stats.fundReturn) > 0 ? '+' : ''}{stats.fundReturn}%
                  </p>
                  <p className="text-gray-300 mt-2">Return over {(timeframe / 365).toFixed(1)} years</p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  Number(stats.ilpReturn) > 0
                    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                    : 'bg-red-500/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-4">{selectedILP.name}</h3>
                  <p className={`text-3xl font-bold ${
                    Number(stats.ilpReturn) > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {Number(stats.ilpReturn) > 0 ? '+' : ''}{stats.ilpReturn}%
                  </p>
                  <p className="text-gray-300 mt-2">Return over {(timeframe / 365).toFixed(1)} years</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl border border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-16"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Investment Difference</h3>
                <p className="text-4xl font-bold text-emerald-400 mb-2">
                  ${Number(stats.difference).toLocaleString()}
                </p>
                <p className="text-xl text-emerald-300">
                  {stats.percentageDifference}% more wealth with {selectedFund.name}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-2xl text-gray-300 italic">
                  "Spend 10 minutes a month managing your own investments and save ${Math.abs(Number(stats.difference)).toLocaleString()} over buying an ILP"
                </p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizationPage;