
import React, { useEffect, useState }from 'react';
import './App.css';


function App() {
  const [data, setData] = useState([]);
  const url = "https://gist.githubusercontent.com/VincentLeV/a0c326b9cbeabf63b4e5e02aa9779f6c/raw/b916a9e3d40aef926bf7e3b9b4db308d7da1ca5d/shares.json";
    const fetchData = () => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch(err => console.log(err));
    }
    useEffect(() => fetchData(), []);
    console.log(data);
     // Calculating 2021's dividend yield 
    const dividend2021 = data.map(el => el.dividendHistory[0].dividend);
    const price = data.map(el => el.price);
    const yieldArr = []; 
    for (let i = 0; i < dividend2021.length; i++) {
      let y = (dividend2021[i] / price[i] * 100).toFixed(2);
      yieldArr.push(y);
    }
    console.log(yieldArr);

    // Calculating 5 years average dividend yield 
    const dividendHistory = data.map(el => el.dividendHistory.map(x => x.dividend));
    console.log(dividendHistory);
    const dividendInFiveYears = dividendHistory.map(el => el.slice(0,5))
    console.log(dividendInFiveYears);




     /* const sumArr = [];
     let sum = 0;

     for (let i = 0; i < dividendInFiveYears.length; i++) {
       for (let k = 0; i < dividendInFiveYears[i].length; k++) {
         sum += dividendInFiveYears[i][k]
         sumArr.push(sum);
       }
     }

     console.log(sumArr);
     */ 

  

   
    // console.log(price);
    // console.log(dividend2021);
  
    const averageDividend = [];

    /* for (let i = 0; i < dividendInFiveYears.length; i++) {
      let avg = ((sumArr[i]/5) / price[i] * 100).toFixed(2);
      averageDividend.push(avg); 
    }

    console.log(averageDividend);

    /*const weights = [3,2,1,1,1];
    const weightedAvgDiv = [];

    for (let i = 0; i < dividendInFiveYears.length; i++) {
      let weightedAvg = (sum/weights[i] / price[i] * 100).toFixed(2)
      weightedAvgDiv.push(weightedAvg);
    }

    console.log(weightedAvgDiv); 
    */

   

  
  return (
    <div className="App">
    </div>
  );
}

export default App;
