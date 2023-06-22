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
  const [ properties, setProperties ] = useState();

  const [ showProperties, setShowProperties ] = useState(false);

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const property = {
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
    tenure: null,
  };


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
    createProfitData();
    getProperties();
    setShowProperties(true);
  },[])

  async function getProperties() {
    const response = await axios.get(
      `https://propertease-api.onrender.com/properties/users/648b1ecf800c2596b4c79aa1`
    );
    const properties = response.data

    setProperties(properties)
    console.log(properties)

  }


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
          {chartData ? <BarChart chartData={chartData} /> : 'Loading...'}
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
              <p>{ property.address}</p>
              
              <br />
              Current Tenant: Harley Quin
              {isOpen && (
                <LargeModal
                  children={<PropertyInformation property={ property} setIsOpen={setIsOpen} />}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div id="box6" className="fade-in" onClick={() => setIsOpen(true)}>
              Property Listing 2<br />
              <p>{ property.address}</p>
              <br />
              Current Tenant: Michael Scott
              {isOpen && (
                <LargeModal
                  children={<PropertyInformation property={ property} setIsOpen={setIsOpen} />}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div id="box7" className="fade-in" onClick={() => setIsOpen(true)}>
              Property Listing 3<br />
              <p>{ property.address}</p>
              <br />
              Current Tenant: Beyonce Knowles
              {isOpen && (
                <LargeModal
                  children={<PropertyInformation property={ property} setIsOpen={setIsOpen}/>}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
          </div> )}
         
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
