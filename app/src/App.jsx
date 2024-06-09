import { useEffect, useState } from 'react';
import styled from 'styled-components'
import FoodCardSection from './components/FoodCardSection';

export const BASE_URL = "http://localhost:9000";

const App = () => {

  const [data, setData] = useState(null);
  const [filtereddata, setFiltereddata] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(()=>{
    const fetchFoodData = async () =>{
      setLoading(true)
  
      try {
        const response = await fetch(BASE_URL);
  
        const json = await response.json();
  
        setData(json);
        setFiltereddata(json)
        setLoading(false);
  
      } catch (error) {
          setError("Unable to fetch data")
      } 
    };
    fetchFoodData();

  }, []); //we have pass dependence array to say useEffect to one only once

  


  const searchFood = (e) =>{
    const searchValue = e.target.value;

    if(searchValue == ""){
      setFiltereddata(null)
    }

    const filter = data?.filter((food) => 
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFiltereddata(filter);

  }

  const filterFood = (type) => {
    if (type === "all") {
      setFiltereddata(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFiltereddata(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if(error) return <div>{error}</div>;
  if(loading) return <div>Loading......</div>


  return (
    <>
  <Container>
    <TopConatainer>
      <div className="logo">
        <img src="/FoodyZone.svg" alt="logo" />
      </div>

      <div className="search">
        <input onChange = {searchFood} placeholder="Search Food" />
      </div>
    </TopConatainer>
      
    <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
    
    
  </Container>
  <FoodCardSection data = {filtereddata}/>

  </>
  
)
};

export default App;

export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;

`

const TopConatainer = styled.section`
display: flex;
height: 120px;
justify-content: space-between;
padding: 16px;
align-items: center;


.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    border-radius: 5px;
    color: white;
    height: 35px;
    width: 285px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder {
        color: white;
      }
  }
}

@media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }

`

const FilterContainer = styled.div`
display: flex;
justify-content: center;
gap: 10px;
padding-bottom: 20px;

`

export const Button = styled.button`
 background: ${({ isSelected }) => (isSelected ? "#de0202" : "#ff4343")};
 outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
&:hover{
  background-color: #de0202;
}

`





