import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootStore } from "../../store/congifureStore";
import { readDeviceLog } from "../../features/api/device";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { BaseFlexCenterDiv } from "../../static/componentSet";


interface DeviceValueProps {
  times: string[];
  devId: number;
}

const DeviceValue: React.FC<DeviceValueProps> = ({ times, devId }) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  
  const [deviceSave, setDeviceSave] = useState<any[]>(Array.from({length: times.length}, () => "-")); 
  const [deviceValue, setDeviceValue] = useState<any[]>(Array.from({length: times.length}, () => "-")); 

  const getLogByTimestamp = (devLog:any, timestamp:any) => {
    if (devLog[timestamp]) {
      return devLog[timestamp];
    }

    const precedingTimestamp = Object.keys(devLog)
      .map(Number)
      .filter(ts => ts < timestamp)
      .sort((a, b) => b - a)[0];
  
    return precedingTimestamp ? devLog[precedingTimestamp] : "-";
  }

  useEffect(() => {
    (async () => {
      try {
        if (devId > 0) {
          const result =  await readDeviceLog(devId, settingSet.date);

          if (result.deviceLog === undefined) 
            return;

          const date = new Date(settingSet.date);
          const devYear = date.getFullYear();
          const devMonth = date.getMonth();
          const devDate = date.getDate();

          const deviceData = times.map((time: string) => {
            return new Date(devYear, devMonth, devDate, 
                            Number(time.slice(0,2)), Number(time.slice(-2))).getTime();
          }).map((devTime: number) => {
            return getLogByTimestamp(result.deviceLog, devTime);
          });

          console.log("deviceData", deviceData)
          
          setDeviceValue(deviceData);
          setDeviceSave(deviceData);
        }
      }
      catch (error) {
        console.error(error);
      }
    })();
  }, [settingSet.date]);

  useEffect(() => {
    if (settingSet.viewType === 0) {
      setDeviceValue(deviceSave);
      return;
    }

    const deviceId = []
    for (let i = 0; i < deviceSave.length; i += 1) {
      deviceId.push(devId);
    }
    setDeviceValue(deviceId);
    
  }, [settingSet.viewType]);

  return (
    <>
      {deviceValue.map((value:any, index:number) => (
        <ValueColumn3 key={index}>{value}</ValueColumn3>
      ))}
    </>
  );
};

const ValueColumn3 = styled(BaseFlexCenterDiv)<{ fontsize?: string }>`
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};

  height: 25px;  
  width: calc(100% - 2px);
  min-width: 25px;

  border: 1px solid #ccc;
`;

export default DeviceValue;
  