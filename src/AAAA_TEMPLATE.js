import React, { useState } from "react";
import "./AAAA_TEMPLATE.css";

const AAAA_TEMPLATE = (props) => {
  return <div></div>;
};

export default AAAA_TEMPLATE;

/* END OF BUILDING BLOCK */

/* random id generator */
id: Math.random().toString(36).substr(2, 5);
/* -------------------------------------------------------------------------- */

/* filtering and deleting instances by id */
const deleteHandler = (toDeleteID) => {
  const updatedUsers = activeUsers.filter((e) => e.id !== toDeleteID);
  setActiveUsers(updatedUsers);
};
/* -------------------------------------------------------------------------- */

/* find the INDEX of an OBJECT inside of an array */

const index = VARIABLE.findIndex((item) => item.name === "John");
/* -------------------------------------------------------------------------- */
