import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { Card as MuiCard, CardContent, CardHeader } from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { fade } from "@material-ui/core/styles/colorManipulator";

import { Line } from "react-chartjs-2";

import moment from "moment";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 250px;
`;

function getDynamicColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function getAverageWaste(wasteDailyData, mealCountDailyData, currentDay) {
  let totalMealCount = mealCountDailyData
    .filter((data) => {
      return data.report_date === currentDay;
    })
    .reduce((total, item) => total + item.total_count, 0);
  if (totalMealCount) {
    let totalWaste = wasteDailyData
      .filter((data) => {
        return data.report_date === currentDay;
      })
      .reduce((total, item) => total + item.total_weight, 0);
    return Number(totalWaste / totalMealCount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }
  return 0;
}

function DailyWastageByMealCountChart({
  theme,
  reportDate,
  mealCountData,
  wasteData,
  location,
}) {
  const data = (canvas) => {
    let days = [...new Array(7)].map((i, index) =>
      moment(reportDate)
        .subtract(7 - index - 1, "days")
        .format("YYYY-MM-DD")
    );
    let mealCountDailyData = mealCountData ? mealCountData.daily_data : [];
    let wasteDailyData = wasteData ? wasteData.daily_data : [];
    mealCountDailyData = mealCountDailyData.filter(
      (data) => location === "All" || data.location === location
    );
    wasteDailyData = wasteDailyData.filter(
      (data) => location === "All" || data.location === location
    );
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.0875));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    return {
      labels: days.map((day) => moment(day).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "Waste per Meal Count",
          fill: true,
          backgroundColor: gradient,
          borderColor: getDynamicColor(),
          data: days.map((day) =>
            getAverageWaste(wasteDailyData, mealCountDailyData, day)
          ),
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.0)",
          },
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0.0375)",
            fontColor: "#fff",
          },
        },
      ],
    },
  };
  return (
    <Card mb={3}>
      <CardHeader title="Daily Total Waste Per Meal/Manday/Resident" />
      <CardContent>
        <ChartWrapper>
          <Line data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}
export default withTheme(DailyWastageByMealCountChart);
