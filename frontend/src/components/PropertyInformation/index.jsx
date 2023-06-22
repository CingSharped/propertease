import React, { useState, useEffect } from "react";
import axios from "axios";
import './dashboardmodal.css';
import BarChart from '../BarChart';
import MaintenanceRequestList from "../MaintenanceRequestList";


const PropertyInformation = ({property, setIsOpen}) => {
  const [chartData, setChartData] = useState();
  // const user = localStorage.getItem('user')
 
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchRequests() {
      try {
        const res = await fetch(
          `https://propertease-api.onrender.com/workorders`
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
  // const transactions = [
  //   {
  //     _id: "oiew493hun3j",
  //     property_id: "i43bh43b3",
  //     property_owner_id: "ij43ublik3jb",
  //     month: "January",
  //     money: "1000",
  //     transaction_type: "Income",
  //     workorder_id: "3ikjbol435iuhb",
  //   },
  //   {
  //     _id: "oiew493hun3j",
  //     property_id: "i43bh43b3",
  //     property_owner_id: "ij43ublik3jb",
  //     month: "Feburary",
  //     money: "2000",
  //     transaction_type: "Income",
  //     workorder_id: "3ikjbol435iuhb",
  //   },
  //   {
  //     _id: "oiew493hun3j",
  //     property_id: "i43bh43b3",
  //     property_owner_id: "ij43ublik3jb",
  //     month: "January",
  //     money: "300",
  //     transaction_type: "Expense",
  //     workorder_id: "3ikjbol435iuhb",
  //   },
  //   {
  //     _id: "oiew493hun3j",
  //     property_id: "i43bh43b3",
  //     property_owner_id: "ij43ublik3jb",
  //     month: "Feburary",
  //     money: "300",
  //     transaction_type: "Expense",
  //     workorder_id: "3ikjbol435iuhb",
  //   },
  // ];

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
        setChartData({
          labels: profits.map((data) => data.month),
          datasets: [
            {
              label: "Users Gained",
              data: profits.map((data) => data.profit),
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
          <div id="boxno1" className="fade-in" onClick={() => this.navigateTo('./ifc')}>
            <p>{property.address}</p>
          </div>
          <div id="boxno2" className="fade-in">
            {chartData ? <BarChart chartData={chartData} /> : 'Loading...'}
          </div>
          
          <div id="boxno3" className="fade-in">
          <p>{property.description}</p>
          </div>
          <div id="boxno4" className="fade-in">
            <p>{property.tenure}</p>
            <p>{property.energy_rating}</p>
            <p>{property.bathrooms}</p>
            <p>{property.council_tax_band}</p>
          </div>
          <div id="boxno5" className="fade-in">
          <MaintenanceRequestList />
            </div>
        </div>
      </div>
    
    );
  }

export default PropertyInformation;
