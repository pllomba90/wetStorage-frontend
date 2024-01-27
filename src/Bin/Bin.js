import React, { useState } from "react";
import {Button, Col} from "reactstrap"
import Popup from 'reactjs-popup';
import InsertForm from "./InsertForm";
import 'reactjs-popup/dist/index.css';
import "./Bin.css"



const Bin = ({bin}) =>{
    const [selectedBinName, setSelectedBinName] = useState("")


const Tooltip = () => (
    <Popup trigger={ <Col className="bin" sm="12">
    <h4>{bin.bin_name}</h4>
    <ul>
 <li>date : {bin.date}</li>
 <li>grade : {bin.grade}</li>
  quantity : {bin.quantity}
  </ul>
    </Col>}
     
    >
    {close => (
          <div>
            <h4>{bin.bin_name}</h4>
            <Popup trigger={ open =>(
            <Button color="secondary" onClick={setSelectedBinName(bin.bin_name)}>
            Insert Oysters
            {open ? 'Opened' : 'Closed'} </Button>)}
          nested

          >
          <div>
           <InsertForm closeInsertForm={close} binName={selectedBinName}/>
          </div>
          </Popup>
            <Button color="secondary">Extract Oysters</Button>
            <Button color="danger" onClick={close}>Cancel</Button>
            
          </div>
          
        )} 
                </Popup>
)

    return (
        <div >
           
          { Tooltip()}
               
        </div>
        
    )

}

export default Bin;