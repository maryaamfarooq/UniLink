import React, { useEffect, useState } from 'react'
import SearchResult from './SearchResult/SearchResult';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import "./search.css";
import axios from 'axios';

export default function Search(props) {

    var departmentArr = ['SEECS (School of Electrical Engineering and Computer Science)', 'SMME (School of Mechanical and Manufacturing Engineering)', 'NICE (Nust Institute of Civil Engineering', 'SADA (School of Art Design and Architecture', 'S3H (School of Social Sciences and Humanities)', 'SCME (School of Chemical and Materials Engineering)', 'NBS (Nust Business School)', 'ASAB (Atta Ur Rehman School of Applied Biosciences)', 'NSTP (National Science and Technology Park)', 'RIMMS (Research Institute for Microwave and Milimeter-Wave Studies)', 'IAEC', 'SNS (School of Natural Sciences)', 'IGIS (Institue of Geographical Information Systems)'];
    var newDepartmentArr = departmentArr.map(dep => <option key={dep} value={dep}>{dep}</option>);

    const [batchArr, setBatchArr] = useState([]);
    const [newBatchArr, setNewBatchArr] = useState([]);

    var categoryArr = ["Alumni", "Student", "Faculty"];
    var newCategoryArr = categoryArr.map(c => <option key={c} value={c}>{c}</option>)

    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [employment, setEmployment] = useState("");

    const [allSearchResults, setAllSearchResults] = useState([])

    const [expandFilters, setExpandFilters] = useState(false);

    useEffect(() => {
        const newBatchArray = [];
        for (let i = 1995; i <= 2027; i++) {
          newBatchArray.push(<option key={i} value={i}>{i}</option>);
        }
        setBatchArr(newBatchArray);
        setNewBatchArr(newBatchArray);
      }, []);

    useEffect(() => {
        // console.log("SEARCH QUERY: " + props.searchQuery);
        searchUser(props.searchQuery);
    }, [props.searchQuery, department, batch, category, location, employment])

    async function searchUser(query) {
        try {
            // console.log(query);
            var queryParam = `firstName=${query}`;
            if(department.length > 0) queryParam += `&department=${department}`;
            if(batch.length > 0) queryParam += `&batch=${batch}`;
            if(category.length > 0) queryParam += `&category=${category}`;
            if(location.length > 0) queryParam += `&city=${location}`;
            if(employment.length > 0) queryParam += `&employment=${employment}`;
            // console.log("SEARCH RESULTS: " + queryParam);
            const token = localStorage.getItem("token");
            const {data} = await axios.get(`http://localhost:8080/api/v1/user/?${queryParam}`, {
                headers:{
                  authorization: `Bearer ${token}`
                }
              });
            // console.log("SEARCH RESULTS: " + JSON.stringify(data));
            setAllSearchResults(data.result);
        } catch (error) {
            // console.error(error.response.data);ß
        }
    }

    function showFilters() {
        setExpandFilters(prevValue => !prevValue);
    }

    function goToUser(userInfo) {
        props.onHandleViewUserProfile(userInfo)
    }

  return (
    <div className="search-wrapper">

        <div className="search-filters-wrapper">
            <div>
                {!expandFilters && <button className="filters-btn" onClick={showFilters}>Filters <ArrowDropDownIcon /></button>}
                {expandFilters && <button className="filters-btn" onClick={showFilters}>Filters <ArrowDropUpIcon /></button>}
            </div>

            {expandFilters && 
            
            <div>
                <div className="filters-row1">
                    <select onChange={(e) => setDepartment(e.target.value)} className="search-filters-1">
                        <option>Department</option>
                        {newDepartmentArr}
                    </select>

                    <select onChange={(e) => setBatch(e.target.value)} className="search-filters-1">
                        <option>Batch</option>
                        {newBatchArr}
                    </select>
                    
                    <select onChange={(e) => setCategory(e.target.value)} className="search-filters-1">
                        <option value="">Category</option>
                        {newCategoryArr}
                    </select>
                </div>

                <div className="filters-row2">
                    <input onChange={(e) => setLocation(e.target.value)} className="search-filters-2" placeholder="Location" />
                    <input onChange={(e) => setEmployment(e.target.value)} className="search-filters-2" placeholder="Employment" />
                </div>
            </div>}

        </div>

      {/* results {props.searchQuery} */}
      {allSearchResults && allSearchResults.map((r) => (
          <SearchResult onClick={() => goToUser(r)} key={r._id} result={r} />
        ))}
    </div>
  )
}
