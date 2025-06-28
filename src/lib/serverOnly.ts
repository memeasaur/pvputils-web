

import {FabricPvpUtilsDescription} from "@/lib/server";
import React from "react";
import ReactDOMServer from "react-dom/server";

export function renderDescription(data: any) {
    return ReactDOMServer.renderToStaticMarkup(React.createElement(FabricPvpUtilsDescription, { data }))
}