import React, {useState, useEffect} from "react";

// class CurrencyTable extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         error: null,
//         isLoaded: false,
//         items: []
//       };
//     }
  
//     componentDidMount() {
//       fetch("http://api.nbp.pl/api/exchangerates/rates/A/CHF/?format=json")
//         .then(res => res.json())
//         .then(
//           (result) => {
//             console.log(result.rates[0].mid)
//           },

        
//         )
//     }
  
//     render() {
//       return(
//           <div>xxx</div>
//       )
      
//     }
//   }


function CurrencyTable(){
    const [items, setItems] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/A/CHF/?format=json")
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result.rates[0].mid)
          },
          error => {
            setError(error);
          }, []

        
        )
    })
    if(error){
        return <div>{error.message}</div> 
    } else {
        return(
            <div>{items}</div>
        )
        
    }
      

}


export default CurrencyTable;
