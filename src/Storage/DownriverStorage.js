import React, { useState, useEffect } from "react";
import Bin from "../Bin/Bin";
import StorageAPI from "../helpers/StorageApi";
import { Spinner, Row, Col } from "reactstrap";

const Home = () => {
  const [binInfo, setBinInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await StorageAPI.getStorage();
        setBinInfo(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const renderBins = () => {
    if (!binInfo) {
      return <Spinner>Loading...</Spinner>;
    }

    const binsPerRow = 12;
    const numRows = Math.ceil(binInfo.length / binsPerRow);
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const start = i * binsPerRow;
      const end = start + binsPerRow;
      const rowBins = binInfo.slice(start, end);

      rows.push(
        <Row key={i} className="justify-content-center">
          {rowBins.map((bin) => (
            <Col key={bin.bin_name} xs="auto">
              <Bin bin={bin} />
            </Col>
          ))}
        </Row>
      );
    }

    return rows;
  };

  return (
    <div >
      <div className="title_box">
        <div className="title">
          <h1>Norumbega Oyster</h1>
        </div>
        <div>
          <h4>Downriver Wet Storage</h4>
        </div>
      </div > 
      <div className="container-fluid">{renderBins()}</div>
    </div>
  );
};

export default Home;