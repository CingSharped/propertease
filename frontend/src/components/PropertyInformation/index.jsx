import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboardmodal.css";
import BarChart from "../BarChart";
import MaintenanceRequestList from "../MaintenanceRequestList";

const PropertyInformation = ({ property, setIsOpen }) => {
  const [chartData, setChartData] = useState();
  // const user = localStorage.getItem('user')

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRequests() {
    try {
      const res = await fetch(
        `https://propertease-api.onrender.com/workorders/properties/648b64ca2431694eaff1d1dc`
      );

      const json = await res.json();

      setData(json);

      data.length === 0 ? setIsLoading(false) : "";
    } catch (error) {
      console.log("error loading data");
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);


  async function createProfitData() {
        const response = await axios.get(
      `https://propertease-api.onrender.com/transactions/properties/648b64ca2431694eaff1d1dc`
    );
    const transactions = response.data
    console.log(transactions)
    if (transactions != undefined) {
      const months = [];
      transactions.map((transaction) => {
        if (!months.includes(transaction.month)) {
          months.push(transaction.month);
        }
      });
      console.log(months);
      const grossProfit = [];
      const profits = []
      const expenses = []
      months.map((month) => {
        grossProfit.push({
          month: month,
          profit: 0,
        });
        profits.push({
          month: month,
          income: 0
        })
        expenses.push({
          month: month,
          expense: 0
        })
      });
      transactions.map((transaction) => {
        if (transaction.transaction_type == "Income") {
          grossProfit.forEach((profitData) => {
            if (profitData.month == transaction.month) {
              profitData.profit =
                parseInt(profitData.profit) + parseInt(transaction.money);
            }
          });
          profits.forEach(profitData => {
            if (profitData.month == transaction.month) {
              profitData.income = parseInt(transaction.money)
            }
          })
        }
        if (transaction.transaction_type == "Expense") {
          grossProfit.forEach((profitData) => {
            if (profitData.month == transaction.month) {
              profitData.profit =
                parseInt(profitData.profit) - parseInt(transaction.money);
            }
          });
          expenses.forEach(expenseData => {
            if (expenseData.month == transaction.month) {
              expenseData.expense = parseInt(transaction.money)
            }
          })
        }
        // grossProfit.map((data) => data.month)
        setChartData({
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: "Profits",
              data: profits.map((data) => data.income),
            },
            {
              label: "Expenses",
              data: expenses.map((data) => data.expense),
            },
            {
              label: "Gross Profit",
              data: grossProfit.map((data) => data.profit),
            },
          ],
        });
      });
      console.log(profits);
      
    }
  }

  useEffect(() => {
    createProfitData();
  }, []);

  return (
    <div>
      <div id="main-container">
        <h1>{property.title}</h1>
        <div
          id="boxno1"
          className="fade-in"
          onClick={() => this.navigateTo("./ifc")}
        >
          {property.name}
        </div>
        <div id="boxno2" className="fade-in">
          {chartData ? <BarChart chartData={chartData} /> : "Loading..."}
        </div>

        <div id="boxno3" className="fade-in">
          Description:
          <br />
          <br />
          {property.description}
        </div>
        <div id="boxno4" className="fade-in">
          <p>Tenure: {property.tenure}</p>
          <p>Energy Rating: {property.energy_rating}</p>
          <p>Bathrooms: {property.bathrooms}</p>
          <p>Council Tax Band: {property.council_tax_band}</p>
        </div>
        <div id="boxno5" className="fade-in">
          <MaintenanceRequestList data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default PropertyInformation;
