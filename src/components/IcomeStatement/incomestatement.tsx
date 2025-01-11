import React, { useState, useEffect } from 'react';
import { IncomeStatement, columns } from "../Table-Columns/IncomeStatementColumn"
import { DataTable } from "../ui/data-table"

const IncomeStatementTable: React.FC = () => {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=ISp80oiFbEy7aVHSj2WKK1uHRKV9jEyG'
        );
        const result = await response.json();
        setData(result as IncomeStatement[]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} date="date" />
    </div>
  )
};

export default IncomeStatementTable;
