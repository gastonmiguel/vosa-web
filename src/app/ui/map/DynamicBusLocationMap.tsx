import dynamic from "next/dynamic";

const DynamicBusLocationMap = dynamic(() => import("./BusLocationMap"), {
  ssr: false,
});

export default DynamicBusLocationMap;

