import './App.css';
import Container from "./components/Container.js";
import Navbar from "./components/Navbar.js";
import Table from "./components/EmployeeTable.js";
import API from "./utils/API";
import React, { useState, useEffect } from "react";
import EmployeeTable from "./components/Employee.js";


function App() {
  // Getter and Setter for results & search
  const [results, setResults] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState(true)

  // API call and setting the results to the API call, empty array makes this equivalent to componentOnMount
  useEffect(() => {
    API.getTeam().then(res => setResults(res.data.results))
  }, [])

  // Variable/function for sorting a-z
  let alphaSort = function (prop, arr) {
    arr.sort(function (a, b) {
      if (a.name[prop] < b.name[prop]) {
        return -1;
      } else if (a.name[prop] > b.name[prop]) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  // Variable/function for sorting z-a
  let betaSort = function (prop, arr) {
    arr.sort(function (a, b) {
      if (a.name[prop] < b.name[prop]) {
        return 1;
      } else if (a.name[prop] > b.name[prop]) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    if (sort) {
      alphaSort("first", results)
    }
    else {
      betaSort('first', results)
    }

  }, [results, sort])


  return (
    <div className="App" >
      <Navbar></Navbar>
      <Container>
        <input placeholder="Search for employee" type="text" className='searchBar' value={search} onChange={(event) => { setSearch(event.target.value) }}>
        </input>
        <div width="50%" style={{margin: '0 auto', alignContent: 'center', textAlign: 'center'}}>
        <Table sort={sort} setSort={setSort}>
          {search.length < 1 ? results.map((result, i) => (
            <EmployeeTable
              name={result.name.first + " " + result.name.last}
              number={i}
              email={result.email}
              phone={result.phone}
              picture={result.picture.large} >
            </EmployeeTable>
          )) :
            // eslint-disable-next-line array-callback-return
            results.map((result, i) => {
              if (result.name.first.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <EmployeeTable
                    name={result.name.first + " " + result.name.last}
                    number={i}
                    email={result.email}
                    phone={result.phone}
                    picture={result.picture.large} >
                  </EmployeeTable>)
              }
            })
          }
        </Table>
        </div>
      </Container>
    </div>
  )
}

export default App;