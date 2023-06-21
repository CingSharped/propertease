import React, { useState, useEffect } from "react";
import './dashboardmodal.css';
import BarChart from '../BarChart';
import MaintenanceRequestList from "../MaintenanceRequestList";


const PropertyInformation = () => {
  const [profitData, setProfitData] = useState([]);
 

  const transactions = [
    {
      _id: "oiew493hun3j",
      property_id: "i43bh43b3",
      property_owner_id: "ij43ublik3jb",
      month: "January",
      money: "1000",
      transaction_type: "Income",
      workorder_id: "3ikjbol435iuhb",
    },
    {
      _id: "oiew493hun3j",
      property_id: "i43bh43b3",
      property_owner_id: "ij43ublik3jb",
      month: "Feburary",
      money: "2000",
      transaction_type: "Income",
      workorder_id: "3ikjbol435iuhb",
    },
    {
      _id: "oiew493hun3j",
      property_id: "i43bh43b3",
      property_owner_id: "ij43ublik3jb",
      month: "January",
      money: "300",
      transaction_type: "Expense",
      workorder_id: "3ikjbol435iuhb",
    },
    {
      _id: "oiew493hun3j",
      property_id: "i43bh43b3",
      property_owner_id: "ij43ublik3jb",
      month: "Feburary",
      money: "300",
      transaction_type: "Expense",
      workorder_id: "3ikjbol435iuhb",
    },
  ];

  function createProfitData(transactions) {
    if (transactions != undefined) {
      const months = [];
      transactions.map((transaction) => {
        if (!months.includes(transaction.month)) {
          months.push(transaction.month);
        }
      });
      console.log(months);

      const profits = [];
      months.map((month) => {
        profits.push({
          month: month,
          profit: 0,
        });
      });
      transactions.map((transaction) => {
        if (transaction.transaction_type == "Income") {
          profits.forEach((profitData) => {
            if (profitData.month == transaction.month) {
              profitData.profit =
                parseInt(profitData.profit) + parseInt(transaction.money);
            }
          });
        }
        if (transaction.transaction_type == "Expense") {
          profits.forEach((profitData) => {
            if (profitData.month == transaction.month) {
              profitData.profit =
                parseInt(profitData.profit) - parseInt(transaction.money);
            }
          });
        }
      });
      console.log(profits);
      setProfitData(profits);
    }
  }

  useEffect(() => {
    createProfitData(transactions);
  }, []);

  const chartData = {
    labels: profitData.map((data) => data.month),
    datasets: [
      {
        label: "Users Gained",
        data: profitData.map((data) => data.profit),
      },
    ],
  };



    return (
   
      <div>
        <div id="main-container">
          <h1>Property 1</h1>
          <div id="boxno1" className="fade-in" onClick={() => this.navigateTo('./ifc')}>
            Address: 
          </div>
          <div id="boxno2" className="fade-in">
            <BarChart chartData={chartData} />
          </div>
          
          <div id="boxno3" className="fade-in">
          Description
          </div>
          <div id="boxno4" className="fade-in">
          Tenure, Energy Rating, Bathrooms, Council Tax Band
          </div>
          <div id="boxno5" className="fade-in">
          <MaintenanceRequestList />
            </div>
        </div>
      </div>
    
    );
  }

export default PropertyInformation;
