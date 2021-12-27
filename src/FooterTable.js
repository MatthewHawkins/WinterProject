import React, { memo, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import { csv } from "d3-fetch";


function renderTableData(){

}
function FooterTable(){
    const [newData, setNewData] = useState([]);
    useEffect(() => {
        csv(`/ONLY_PRICE_CHG.csv`).then((newData) => {
        setNewData(newData);
        });
    }, []);
    
    return(
        <>
            <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                    <th>ISO_A3 Tag</th>
                    <th>Country Name</th>
                    <th>Exchange Name</th>
                    <th>Ticker</th>
                    <th>Price Change</th>
                    </tr>
                </thead>
                <tbody>                    
                    {newData.map(newData => <tr><td>{newData.ISO_A3}</td>
                                                <td>{newData.NAME}</td>
                                                <td>{newData.EXCHANGE}</td>
                                                <td>{newData.TICKER}</td>
                                                <td>{newData.PRICE_CHANGE}</td>
                                            </tr>)}
                    


                </tbody>
            </Table>
        </>
    );
}


export default FooterTable;