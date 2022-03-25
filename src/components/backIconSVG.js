import React from "react";

import { ReactComponent as SVGIcon } from "../resources/icons/back_arrow.svg";

const BackIconSVG = (props) => {
  return <SVGIcon className={props.className} onClick={props.onClick} />;
};

export default BackIconSVG;
