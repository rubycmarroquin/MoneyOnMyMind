import { useEffect, useState } from "react";
import MonthDropDown from "./YearMonthDropDown";
import { Chart } from "react-google-charts";
import GenerateTables from "./GenTable";
import { generateData, generateLineChartData } from "./genChartDataFunctions";

const GenerateCharts = ({
  expenses,
  month,
  setMonth,
  year,
  setYear,
  yearExpenses,
  yearIncome,
}) => {
  const [chartData, setChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  const donutOptions = {
    title: `Spending Habits (${month} ${year})`,
    pieHole: 0.4,
    is3D: false,
    colors: [
      "#e60049",
      "#0bb4ff",
      "#50e991",
      "#e6d800",
      "#9b19f5",
      "#ffa300",
      "#dc0ab4",
      "#b3d4ff",
      "#00bfa0",
    ],
  };

  const columnChartOptions = {
    title: `${year} Spendings and Income by Month`,
    vAxis: { title: "Amount" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 2: { type: "line" } },
    colors: ["#00bfa0", "#e60049", "#ffa300"],
    chartArea: {
      backgroundColor: {
        fill: "#F4F4F4",
        opacity: 100,
      },
    },
  };

  useEffect(() => {
    if (expenses) setChartData(generateData(expenses));
    if (yearExpenses && yearIncome)
      setLineChartData(generateLineChartData(yearExpenses, yearIncome));
  }, [expenses, month, year, yearExpenses, yearIncome]);

  return (
    <div className="GenCharts">
      <h3>
        Viewing {month}, {year}
      </h3>
      <MonthDropDown
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
      {expenses && lineChartData ? (
        <div id="GeneratedContentsDiv">
          <div id="HoldsCharts">
            <div id="DonutChart">
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={chartData}
                options={donutOptions}
              />
            </div>
            <div id="LineChart">
              <Chart
                chartType="ComboChart"
                width="100%"
                height="100%"
                data={lineChartData}
                options={columnChartOptions}
              />
            </div>
          </div>
          <div id="GenTableOnly">
            <GenerateTables expenses={expenses} />
          </div>
        </div>
      ) : (
        <h2>Nothing to Show</h2>
      )}
    </div>
  );
};

export default GenerateCharts;
