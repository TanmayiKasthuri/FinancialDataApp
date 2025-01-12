import React, { useState, useEffect } from 'react';
import { IncomeStatement, columns } from "../Table-Columns/IncomeStatementColumn";
import { DataTable } from "../ui/data-table";
//import RangeSlider from '../ui/rangeslider';
import MultiRangeSlider from '../ui/rangeslider';

const IncomeStatementTable: React.FC = () => {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [minVal, setMinVal] = useState<number>(2);
  const [maxVal, setMaxVal] = useState<number>(400000000000);
  const [minNetProfit, setMinNetProfit] = useState<number>(2);
  const [maxNetProfit, setMaxNetProfit] = useState<number>(100000000000);
  const [filteredData, setFilteredData] = useState<IncomeStatement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const [revenueRange, setRevenueRange] = useState<{ from: number; to: number }>({
    from: 0,
    to: 0,
  });

  const [netIncomeRange, setNetIncomeRange] = useState<{ from: number; to: number }>({
    from: 0,
    to: 0,
  });

  const applyFilters = (
    revenue: { from: number; to: number },
    netIncome: { from: number; to: number }
  ) => {
    const filtered = data.filter(
      (item) =>
        item.revenue >= revenue.from &&
        item.revenue <= revenue.to &&
        item.netIncome >= netIncome.from &&
        item.netIncome <= netIncome.to
    );
    setFilteredData(filtered);
  };

  const handleRangeChange = (newMin: number, newMax: number) => {
    const newRevenueRange = { from: newMin, to: newMax };
    setRevenueRange(newRevenueRange);
    applyFilters(newRevenueRange, netIncomeRange);
  };

  const handleNetProfitRangeChange = (newMin: number, newMax: number) => {
    const newNetIncomeRange = { from: newMin, to: newMax };
    setNetIncomeRange(newNetIncomeRange);
    applyFilters(revenueRange, newNetIncomeRange);
  };

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        

        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=Rr1BwedNOgRi002YOOtwQ7UEmqDECFTY`
        );
        const result = await response.json();

        if (result.length > 0) {
          // Dynamically set initial ranges based on data
          const revenues = result.map((item: IncomeStatement) => item.revenue);
          const netIncomes = result.map((item: IncomeStatement) => item.netIncome);

          const minRevenue = Math.min(...revenues);
          const maxRevenue = Math.max(...revenues);
          const minNetIncome = Math.min(...netIncomes);
          const maxNetIncome = Math.max(...netIncomes);

          setRevenueRange({ from: minRevenue, to: maxRevenue });
          setNetIncomeRange({ from: minNetIncome, to: maxNetIncome });

          setData(result as IncomeStatement[]);
          setFilteredData(result as IncomeStatement[]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update filtered data when ranges or original data change
    applyFilters(revenueRange, netIncomeRange);
  }, [data, revenueRange, netIncomeRange]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto py-10">
    <h2 className="bg-yellow-300 text-black p-2 rounded-full w-max inline-block text-lg sm:text-base sm:py-1 sm:px-2 sm:mt-1 sm:mb-1">
    Revenue Slider
    </h2>
    <MultiRangeSlider min={minVal} max={maxVal} onRangeChange={handleRangeChange} />
    <h2 className="bg-sky-400 text-black p-2 rounded-full w-max inline-block text-lg sm:text-base sm:py-1 sm:px-2 sm:mt-1 sm:mb-1">
      Net Income Slider
    </h2>
    <MultiRangeSlider min={minNetProfit} max={maxNetProfit} onRangeChange={handleNetProfitRangeChange} />
    <DataTable columns={columns} data={filteredData} date="date" />
    </div>
  );
};

export default IncomeStatementTable;
