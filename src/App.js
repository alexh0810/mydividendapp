
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


    // Calculating average dividend yield
        const sumArr = [];
        let sum = 0;

     for (let i = 0; i < dividendInFiveYears.length; i++) {
       for (let k = 0; k < dividendInFiveYears[i].length; k++) {
         sum += dividendInFiveYears[i][k]
       }
       sumArr.push(sum.toFixed(2));
     }

     console.log(sumArr);
    
  
    const averageDividend = [];

     for (let i = 0; i < dividendInFiveYears.length; i++) {
      let avg = ((sumArr[i]/5) / price[i] * 100).toFixed(2);
      averageDividend.push(avg); 
    }

    console.log(averageDividend);


    // Calculating average dividend yield by weights 
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


  
  




 

   
  
  return (
    <div className="App">
      <table>
        <tbody>
          {
            data.map((data, index) => <tr key={index}>
              <td>Share:  {data.share} <br/>
                Company:  {data.company} <br/>
                Price: {data.price} <br/>
                Last year dividend: {dividend2021[index]} <br/>
                Dividend yield: {yieldArr[index]} <br/>
                5 years average dividend yield: {averageDividend[index]} <br/>
                5 years weighted average dividend yield: {weightedAvgDiv[index]}
              </td>
              </tr>)

          }
          
        </tbody>
      </table>
        
    </div>
  );
}

export default App;
