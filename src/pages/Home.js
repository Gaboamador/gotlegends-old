import React, { useState, useContext, useEffect } from "react";
import '../App.css';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
// import Context from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import {BsFillPersonLinesFill, BsReverseLayoutTextWindowReverse, BsCalendarWeek, BsXCircle, BsAward, BsCalendar2Check, BsFillBarChartLineFill} from 'react-icons/bs';
// import { participants, participantsChart } from "../data/participantsData";
import { fetchData } from '../componentes/DataService';
import items from "../data/data";


function Home() {

// /*inicio llamado de datos automaticos*/
const [builds, setBuilds] = useState([]);
const [filteredBuilds, setFilteredBuilds] = useState([]);
const [selectedClass, setSelectedClass] = useState('All');
// const [participantsChart, setParticipantsChart] = useState([]);

useEffect(() => {
  const fetchDataFromAPI = async () => {
    try {
      const { builds } = await fetchData();
      if (builds && Array.isArray(builds)) {
        setBuilds(builds);
        setFilteredBuilds(builds);
      } else {
      console.error('Invalid data format:', builds);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataFromAPI();
}, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participants.json');
//       const jsonData = await response.json();
//         // Check if the response has a "participants" property
//         if (jsonData.participants && Array.isArray(jsonData.participants)) {
//           setParticipants(jsonData.participants);
//         } else {
//           console.error('Invalid data format:', jsonData);
//         }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   fetchData();
// }, []);
/*fin llamado de datos automaticos*/

/*inicio llamado de datos automaticos*/


// useEffect(() => {
// const fetchData = async () => {
//   try {
//     const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json');
//     const jsonData = await response.json();
//       // Check if the response has a "participants" property
//       if (jsonData.participantsChart && Array.isArray(jsonData.participantsChart)) {
//         setParticipantsChart(jsonData.participantsChart);
//       } else {
//         console.error('Invalid data format:', jsonData);
//       }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };
// fetchData();
// }, []);
/*fin llamado de datos automaticos*/

//   const context= useContext(Context)
  
    // Separate participantsChart into non-eliminated and eliminated participants
//   const nonEliminatedParticipants = participantsChart.filter(participant => participants.includes(participant));
//   const eliminatedParticipants = participantsChart.filter(participant => !participants.includes(participant));
  
//   const updateSelectedParticipant = (participant) => {
//     context.setSelectedParticipant(participant);
// }

const handleClassFilter = (className) => {
    if (className === 'All') {
      setFilteredBuilds(builds);
    } else {
      const filtered = builds.filter(build => build.class === className);
      setFilteredBuilds(filtered);
    }
    setSelectedClass(className);
  };


 // Define header mapping
 const headerMapping = {
    name: "BUILD",
    class: "CLASS",
    ultimate: "ULTIMATE",
    ability: "ABILITY",
    perk1: "PERK 1",
    perk2: "PERK 2",
    perk3: "PERK 3",
    katana: "KATANA",
    katana_prop1: "PROP 1",
    katana_prop2: "PROP 2",
    katana_perk1: "PERK 1",
    katana_perk2: "PERK 2",
    ranged: "RANGED",
    ranged_prop1: "PROP 1",
    ranged_prop2: "PROP 2",
    ranged_perk1: "PERK 1",
    ranged_perk2: "PERK 2",
    charm: "CHARM",
    charm_prop1: "PROP 1",
    charm_prop2: "PROP 2",
    charm_perk1: "PERK 1",
    charm_perk2: "PERK 2",
    gw1: "GHOST WEAPON 1",
    gw1_prop1: "PROPERTY 1",
    gw1_prop2: "PROPERTY 2",
    gw1_perk1: "PERK 1",
    gw1_perk2: "PERK 2",
    gw2: "GHOST WEAPON 2",
    gw2_prop1: "PROP 1",
    gw2_prop2: "PROP 2",
    gw2_perk1: "PERK 1",
    gw2_perk2: "PERK 2"
  };
// const headers = Object.keys(builds[0]);
// console.log(headers, "headers")

// const properties = builds.lenght ? Object.keys(builds[0]) : console.error();


// console.log(builds, "builds")
// console.log(properties, "properties")

  // Check if builds has data before proceeding
  if (builds.length === 0) {
    return <p>Loading...</p>;
  }

  // Get the properties (keys) from the first build object
//   const properties = Object.keys(builds[0]);
const properties = Object.keys(builds[0]).filter(prop => prop !== 'name');

  

return (
<div className="content">
<div className="paddingContent"></div>
{/* <Container className="navigation">
  {icons.map((item, index) => (
    <Link to={item.to} key={index} className='icon'>
      <div className="icon-wrapper">
        <div className="icon">
          <item.icon />
        </div>
      </div>
      <div className="label">{item.label}</div>
    </Link>
  ))}
</Container> */}

  
    <Container className="d-flex justify-content-center toggle-button-group">
        <ButtonToolbar>
            <ButtonGroup>
                <Button onClick={() => handleClassFilter('All')}>All Builds</Button>
                <Button onClick={() => handleClassFilter('Hunter')}>Hunter</Button>
                <Button onClick={() => handleClassFilter('Assassin')}>Assassin</Button>
                <Button onClick={() => handleClassFilter('Ronin')}>Ronin</Button>
                <Button onClick={() => handleClassFilter('Samurai')}>Samurai</Button>
            </ButtonGroup>
        </ButtonToolbar>
      </Container>
      
      <Container className="builds-container align-items-center">
      {/* <h1>Builds Table</h1> */}
      <Table className="builds-table">
        <thead>
          <tr>
            <th>BUILD</th>
            {filteredBuilds.map((build, index) => (
              <th key={index}>{build.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {/* {properties.map((property, index) => (
            <tr key={index}>
               <th>{headerMapping[property]}</th>
              {filteredBuilds.map((build, idx) => {
          const item = items[property]?.find(
            (item) => item.name === build[property]
          );
          const itemType = item ? item.type : "";
          const cellClass = itemType ? itemType.toLowerCase() : "";

          return (
            <td key={idx} className={cellClass}>
              {build[property]}
            </td>
          );
        })}
            </tr>
          ))} */}
            {properties.map((property, index) => {
      const shouldAddBreak = ["perk3", "katana_perk2", "ranged_perk2", "charm_perk2", "gw1_perk2"].includes(property);
      const isPerk = property.includes("_perk1") || property.includes("_perk2");
      return (
        <tr key={index} className={shouldAddBreak ? "table-break" : ""}>
          <th>{headerMapping[property]}</th>
          {filteredBuilds.map((build, idx) => {
            const item = items[property]?.find(
              (item) => item.name === build[property]
            );
            const itemType = item ? item.type : "";
            const cellClass = itemType ? itemType.toLowerCase() : "";
            const perkClass = isPerk ? "perk" : "not-perk";
            const content = isPerk ? build[property].toUpperCase() : build[property];
            return (
               <td key={idx} className={`${cellClass} ${perkClass}`}>
                {/* {build[property]} */}
                {content}
              </td>
            );
          })}
        </tr>
      );
    })}
        </tbody>
      </Table>
      </Container>


</div>
);
}  
export default Home;