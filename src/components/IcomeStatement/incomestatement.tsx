import React, { useState, useEffect } from 'react';
import { IncomeStatement, columns } from "../Table-Columns/IncomeStatementColumn";
import { DataTable } from "../ui/data-table";
import RangeSlider from '../ui/rangeslider';

const IncomeStatementTable: React.FC = () => {
  const [data, setData] = useState<IncomeStatement[]>([]);
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

  const handleRevenueRangeChange = (from: number, to: number) => {
    setRevenueRange({ from, to });
  };

  const handleNetIncomeRangeChange = (from: number, to: number) => {
    setNetIncomeRange({ from, to });
  };

  const filterData = (
    data: IncomeStatement[],
    revenueRange: { from: number; to: number },
    netIncomeRange: { from: number; to: number }
  ): IncomeStatement[] => {
    return data.filter(
      item =>
        item.revenue >= revenueRange.from &&
        item.revenue <= revenueRange.to &&
        item.netIncome >= netIncomeRange.from &&
        item.netIncome <= netIncomeRange.to
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=ISp80oiFbEy7aVHSj2WKK1uHRKV9jEyG'
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
    setFilteredData(filterData(data, revenueRange, netIncomeRange));
  }, [data, revenueRange, netIncomeRange]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl font-bold mb-4">Income Statement Table</h1>

      <RangeSlider
        min={revenueRange.from}
        max={revenueRange.to}
        step={1000000000}
        initialFrom={revenueRange.from}
        initialTo={revenueRange.to}
        onChange={handleRevenueRangeChange}
      />
      <p>
        Revenue Range: ${revenueRange.from.toLocaleString()} - ${revenueRange.to.toLocaleString()}
      </p>

      <RangeSlider
        min={netIncomeRange.from}
        max={netIncomeRange.to}
        step={100000000}
        initialFrom={netIncomeRange.from}
        initialTo={netIncomeRange.to}
        onChange={handleNetIncomeRangeChange}
      />
      <p>
        Net Income Range: ${netIncomeRange.from.toLocaleString()} - ${netIncomeRange.to.toLocaleString()}
      </p>

      <DataTable columns={columns} data={filteredData} date="date" dataRaw={data} />
    </div>
  );
};

export default IncomeStatementTable;
