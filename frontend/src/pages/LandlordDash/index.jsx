import React, { useState, useEffect } from "react";
import axios from "axios";
import { LargeModal, PropertyInformation, BarChart, MaintenanceRequestList } from "../../components";

import { Footer } from "../../components";
import "./Dashboards.css";

const Landlord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profitData, setProfitData] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [chartData, setChartData] = useState();
  // const [ properties, setProperties ] = useState();

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const properties = [
    {
      _id: "648b64ca2431694eaff1d1dc",
      address: "125 Furtherwick Road, Canvey Island",
      bathrooms: 4,
      bedrooms: 0,
      council_tax_band: "E",
      created_on: "Thu, 15 Jun 2023 20:21:46 GMT",
      description: "A local gym, located on Canvey Island",
      energy_rating: "C",
      model_id: "jhbv43kjh34jh",
      name: "Anytime Fitness Canvey Island",
      owner_id: "648b1ecf800c2596b4c79aa1",
      postcode: "SS8 7AT",
      property_type: "Terraced",
      rent_date: null,
      rental_cost: 1500,
      tenant_id: "648b1ecf800c2596b4c79aa1",
      tenure: "Leasehold",
    },
    {
      _id: "64944a60abec2e395db04c4d",
      address: "The Broadway, London Rd, Southend-on-Sea",
      bathrooms: 8,
      bedrooms: 0,
      council_tax_band: "F",
      created_on: "Thu, 15 Jun 2023 20:21:46 GMT",
      description: "A local cinema, located in Southend on Sea",
      energy_rating: "E",
      model_id: "jhbv43kjh34jh",
      name: "Odeon Cinema",
      owner_id: "648b1ecf800c2596b4c79aa1",
      postcode: "SS1 1TJ",
      property_type: "Terraced",
      rent_date: null,
      rental_cost: 5000,
      tenant_id: '648b1ecf800c2596b4c79aa1',
      tenure: "Leasehold",
    },
    {
      _id: "64944c85abec2e395db04c4e",
      address: "430 London Rd, Westcliff-on-Sea, Southend-on-Sea",
      bathrooms: 8,
      bedrooms: 0,
      council_tax_band: "F",
      created_on: "Thu, 15 Jun 2023 20:21:46 GMT",
      description: "The Palace Theatre, located in Southend on Sea",
      energy_rating: "D",
      model_id: "jhbv43kjh34jh",
      name: "The Palace Theatre",
      owner_id: "648b1ecf800c2596b4c79aa1",
      postcode: "SS0 9LA",
      property_type: "Terraced",
      rent_date: null,
      rental_cost: 5000,
      tenant_id: "648b1ecf800c2596b4c79aa1",
      tenure: "Leasehold",
    },
  ];


  async function fetchRequests () {
    try {
      const res = await fetch(
        `https://propertease-api.onrender.com/workorders/users/648b1ecf800c2596b4c79aa1`
      );
  
      const json = await res.json()
      
      setData(json)
      
      data.length === 0
      ? setIsLoading(false) 
      : ""
      
    } catch (error) {
      console.log("error loading data")
    }

  }

  
  
  useEffect(() => {
    fetchRequests()
    createProfitData();
    // getProperties();
  },[])

  // async function getProperties() {
  //   const response = await axios.get(
  //     `https://propertease-api.onrender.com/properties/users/648b1ecf800c2596b4c79aa1`
  //   );
  //   const properties = response.data

  //   setProperties(properties)
  //   console.log(properties)

  // }


  async function createProfitData() {
        const response = await axios.get(
      `https://propertease-api.onrender.com/transactions/users/648b1ecf800c2596b4c79aa1`
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
  

  // JS to Toggle Accordian Panels
  useEffect(() => {
    const acc = document.getElementsByClassName("accordion");
    const panels = document.getElementsByClassName("panel");

    const togglePanel = (index) => {
      panels[index].classList.toggle("show");
    };

    const handleAccordionClick = (index) => {
      setActiveAccordion((prevActive) => (prevActive === index ? null : index));
      togglePanel(index);
    };

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", () => handleAccordionClick(i));
    }
  }, []);

  return (
    <>
      <div className="dashboard">
        <h4 className="dashboard-heading-title">Landlord Dashboard</h4>

        <div id="main-container">
          <div id="box1" className="fade-in">
            Total Tenants:{" "}
            {properties.reduce((acc, property) => {
              if (property.tenant_id != null) {
                return acc + 1;
              }
              return acc;
            }, 0)}
          </div>
          <div id="box2" className="fade-in">
            Total Properties: {properties.length}
          </div>
          <div id="box3" className="fade-in">
            Outstanding Maintenance Orders: {data.length}
          </div>

          <h4>Overall profit per month</h4>

          <div id="box4" className="fade-in">
            {chartData ? <BarChart chartData={chartData} /> : "Loading..."}
          </div>

          <button
            className={`accordion1 ${activeAccordion === 1 ? "active" : ""}`}
            onClick={() => setActiveAccordion(1)}
          >
            All Properties
          </button>
          <div className={`panel1 ${activeAccordion === 1 ? "show" : ""}`}>
            <div id="box5" className="fade-in" onClick={() => setIsOpen(true)}>
              Current Tenant: Romeo Saint Albin
              <br />
              Address: {properties[0].address}
              <br />
              Postcode: {properties[0].postcode}
              {isOpen && (
                <LargeModal
                  children={
                    <PropertyInformation
                      property={properties[0]}
                      setIsOpen={setIsOpen}
                    />
                  }
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div id="box6" className="fade-in" onClick={() => setIsOpen(true)}>
              Current Tenant: Ree Gilling
              <br />
              Address: {properties[1].address}
              <br />
              Postcode: {properties[1].postcode}
              {isOpen && (
                <LargeModal
                  children={
                    <PropertyInformation
                      property={properties[1]}
                      setIsOpen={setIsOpen}
                    />
                  }
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div id="box7" className="fade-in" onClick={() => setIsOpen(true)}>
              Current Tenant: Emile Sherrott
              <br />
              Address: {properties[2].address}
              <br />
              Postcode: {properties[2].postcode}
              {isOpen && (
                <LargeModal
                  children={
                    <PropertyInformation
                      property={properties[2]}
                      setIsOpen={setIsOpen}
                    />
                  }
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
          </div>
        </div>

        <button
          className={`accordion2 ${activeAccordion === 2 ? "active" : ""}`}
          onClick={() => setActiveAccordion(2)}
        >
          All Work Orders
        </button>
        <div className={`panel2 ${activeAccordion === 2 ? "show" : ""}`}>
          <MaintenanceRequestList data={data} isLoading={isLoading} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landlord;
