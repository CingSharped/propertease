import React, { useState, useEffect } from "react";
import { LargeModal, PropertyInformation, BarChart, MaintenanceRequestList } from "../../components";

import { Footer } from "../../components";
import "./Dashboards.css";

const Landlord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profitData, setProfitData] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchRequests () {
    try {
      const res = await fetch(`https://propertease-api.onrender.com/workorders`)
  
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
  },[])

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

  // const navigateTo = (url) => {
  //   document.body.classList.add('fade-out');
  //   setTimeout(() => {
  //     window.location.href = url;
  //   }, 500);
  // };

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
            Total Number of Tenants: 16
          </div>
          <div id="box2" className="fade-in">
            Total Number of Properties: 3
          </div>
          <div id="box3" className="fade-in">
            Amount of Outstanding Maintenance Orders: 3
          </div>

          <h4>Overall profit per month</h4>

          <div id="box4" className="fade-in">
            <BarChart chartData={chartData} />
          </div>

          <button
            className={`accordion1 ${activeAccordion === 1 ? "active" : ""}`}
            onClick={() => setActiveAccordion(1)}
          >
            All Properties
          </button>
          <div className={`panel1 ${activeAccordion === 1 ? "show" : ""}`}>

            <div id="box5" className="fade-in" onClick={() => setIsOpen(true)}>
              Property Listing 1<br />
              Property Location: Tottenham
              <br />
              Current Tenant: Harley Quin
              {isOpen && (
                <LargeModal
                  children={<PropertyInformation setIsOpen={setIsOpen} />}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div id="box6" className="fade-in" onClick={() => setIsOpen(true)}>
              Property Listing 2<br />
              Property Location: Shoreditch
              <br />
              Current Tenant: Michael Scott
              {isOpen && (
                <LargeModal
                  children={<PropertyInformation />}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div id="box7" className="fade-in" onClick={() => setIsOpen(true)}>
              Property Listing 3<br />
              Property Location: Notting Hill
              <br />
              Current Tenant: Beyonce Knowles
              {isOpen && (
                <LargeModal
                  children={<PropertyInformation />}
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
        <MaintenanceRequestList data={data} isLoading={isLoading}/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landlord;
