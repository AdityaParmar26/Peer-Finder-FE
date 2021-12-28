import React from "react";
import TabsInterest from "../Tabs/Tabs";
import NavBar from "../NavBar/NavBar";

const Interest = () => {

  return (
    <div>
        <NavBar />
        <div style={{marginTop : "30px"}}>
          <TabsInterest />
        </div>
    </div>
  );
};

export default Interest;