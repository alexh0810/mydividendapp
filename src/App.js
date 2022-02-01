
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
    console.log(dividend2021);
    const company = data.map(el => el.company);
    const share = data.map(el => el.share);
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


        const sumArr = [];
        let sum = 0;

     for (let i = 0; i < dividendInFiveYears.length; i++) {
       for (let k = 0; k < dividendInFiveYears[i].length; k++) {
         sum += dividendInFiveYears[i][k]
       }
       sumArr.push(sum.toFixed(2));
     }

     console.log(sumArr);
    

  

   
    // console.log(price);
    // console.log(dividend2021);
  
    const averageDividend = [];

     for (let i = 0; i < dividendInFiveYears.length; i++) {
      let avg = ((sumArr[i]/5) / price[i] * 100).toFixed(2);
      averageDividend.push(avg); 
    }

    console.log(averageDividend);

    const weights = [3,2,1,1,1];
    const weightedAvgDiv = [];

    const weightedSumArr= [];
    let sum1 = 0;
    for (let i = 0; i < dividendInFiveYears.length; i++) {
      for (let k = 0; k < dividendInFiveYears[i].length; k++) {
        sum1 += dividendInFiveYears[i][k] * weights[k]
      }
      weightedSumArr.push(sum1.toFixed(2));
    }

    console.log(weightedSumArr);


    const weightsSum = weights.reduce((total, el) => total += el);
    console.log(weightsSum);

    for (let i = 0; i < weightedSumArr.length; i++) {
      let weightedAvg = (weightedSumArr[i]/ weightsSum / price[i] * 100).toFixed(2);
      weightedAvgDiv.push(weightedAvg);
    }

    console.log(weightedAvgDiv);
    var text =""
    for (let i = 0; i < dividendInFiveYears.length; i++) {
      text+= "Share: " + share[i] +
      " Company: " + company[i]
       + 
      " Price: " + price[i]+ 
      " Last year dividend: " + dividend2021[i] 
      + " Dividend yield-%: " + yieldArr[i]+ 
      " 5-year average dividend yield-% " + averageDividend[i]+ 
      " 5-year weighted average dividend yield-%: " + weightedAvgDiv[i]
    }



  

   

  
  return (
    <text className="App">
      {text}
    </text>
  );
}

export default App;

