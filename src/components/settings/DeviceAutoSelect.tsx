import React, { useEffect, useState } from "react";
import { IDevice, IDivision, IStation } from "../../features/types";

type DeviceSelectProps = {
  devicelist: any;
  station: number;
  division: number;
};

const DeviceAutoSelect: React.FC<DeviceSelectProps> = ({
  devicelist,
  station,
  division,
}) => {
  const [selectedStation, setSelectedStation] = useState<number>(station);
  const [selectedDivision, setSelectedDivision] = useState<number>(division);

  useEffect(() => {
    setSelectedStation(station);
  }, [station]);

  useEffect(() => {
    setSelectedDivision(division);
  }, [division]);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
    console.log("Selected Station:", e.target.value);
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
    console.log("Selected Division:", e.target.value);
  };

  console.log("station", devicelist);

  return (
    <div>
      <select onChange={handleStationChange} value={selectedStation}>
        {devicelist.stations.map((st: IStation, index: number) => (
          <option key={index} value={st.id ? st.id : 0}>
            {st.name}
          </option>
        ))}
      </select>
      <select onChange={handleDivisionChange} value={selectedDivision}>
        {devicelist.divisions.map((div: IDivision, index: number) => {
          if (div.stationId === selectedStation) {
            return (
              <option key={index} value={div.id ? div.id : 0}>
                {div.name}
              </option>
            );
          }
        })}
      </select>
      <select>
        {devicelist.devices.map((dev: IDevice, index: number) => {
          if (
            dev.stationId === selectedStation &&
            dev.divisionId === selectedDivision
          ) {
            return (
              <option key={index} value={dev.id ? dev.id : 0}>
                {dev.name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default DeviceAutoSelect;