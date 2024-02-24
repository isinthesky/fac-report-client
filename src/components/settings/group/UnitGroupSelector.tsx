import React, {useEffect, useState} from "react";
import { DeviceSelectProps, IDevice, IDivision, IStation, Unit } from "../../../static/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BaseFlex1Row, BaseOption, BaseSelect } from "../../../static/componentSet";
import { setCurrentUnitDevice } from "../../../features/reducers/tabPageSlice";
import { updateCurrentGroup, updateCurrentUnitDevice } from "../../../features/reducers/unitGroupSlice";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import { DeviceState } from "../../../features/reducers/deviceSlice";


const UnitGroupAutoSelect: React.FC<DeviceSelectProps> = ({
  unitPosition,
  devicePosition,
  devicelist,
  initStationId,
  initDivisionId,
  currentDeviceId,
}) => {
  const dispatch = useDispatch();

  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);

  const [selectedSt, setSelectedStation] = useState<number>(initStationId);
  const [selectedDiv, setSelectedDivision] = useState<number>(initDivisionId);
  const [selectedDevice, setSelectedDevice] = useState<number>(currentDeviceId);

  const searchWord = useSelector((state: RootStore) => state.settingReducer.deviceSearchWord);

  useEffect(() => {
    setSelectedStation( (initStationId === 0) 
                        ? devicelist.stations[0].id
                        : initStationId);
  }, [initStationId]);

  useEffect(() => {
    setSelectedDivision( (currentDeviceId === 0) 
                         ? initDivisionId
                         : devicelist.devices[currentDeviceId].divisionId);
  }, [initDivisionId]);
  
  useEffect(() => {
    const currentGroup = unitGroupSlice.currentGroup
    if (currentGroup) {
      if (currentGroup.dvList[devicePosition] > 0) {
        setSelectedStation(devicelist.devices[currentGroup.dvList[devicePosition]].stationId);
        setSelectedDivision(devicelist.devices[currentGroup.dvList[devicePosition]].divisionId);
      } else { 
        setSelectedStation((currentGroup.st === 0) 
                            ? devicelist.stations[0].id
                            : currentGroup.st);
      }
    }
  }, []);


  useEffect(() => {
    // division 바뀌어도 device가 선택되어 있으면 selected device 유지
    if (unitGroupSlice.currentGroup.dvList[devicePosition] === 0) {
      setSelectedDevice(0); 
      return;
    }

    setSelectedDevice(selectedDevice)
  }, [selectedDiv]);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const devId = Number(e.target.value);

    setSelectedDevice(devId);
    dispatch(updateCurrentUnitDevice({unitPosition : 0,
                                      devicePosition: devicePosition, 
                                      deviceId: devId }))
  };
  
  return (
    <InnerDiv>
      <SelectDivision onChange={handleStationChange} value={selectedSt}>
        {devicelist.stations.map((st: IStation) => (
          <BaseOption key={st.id} value={st.id}>
            {st.name}
          </BaseOption>
        ))}
      </SelectDivision>
      <SelectDivision onChange={handleDivisionChange} value={selectedDiv}>
        {devicelist.divisions
          .filter((div: IDivision) => div.stationId === selectedSt)
          .map((div: IDivision) => (
            <BaseOption key={div.id} value={div.id}>
              {div.name}
            </BaseOption>)
          )}
      </SelectDivision> 
      <SelectDevice onChange={handleDeviceChange} value={selectedDevice}>
        <BaseOption key={selectedDevice} value={selectedDevice}>
          {selectedDevice === 0 
            ? "Select a device" 
            : devicelist.devices[selectedDevice.toString()]?.name}
        </BaseOption>
        {Object.values(devicelist.devices).filter((dev:IDevice) => {
            if (dev.stationId === selectedSt && dev.divisionId === selectedDiv) {
              if (searchWord.length > 0) {
                return dev.name.toLowerCase().includes(searchWord.toLowerCase()) 
                        ? true 
                        : false;
              }
              return true;
            }
            return false;
          }).map((dev:any) => (
            <BaseOption key={dev.id} value={dev.id}>
              {dev.name}
            </BaseOption>
          ))}
      </SelectDevice>
    </InnerDiv>
  );
};


const InnerDiv = styled(BaseFlex1Row)`
  justify-content: center;
  align-items: stretch;
  text-align: center;
`;


const SelectDivision = styled(BaseSelect)`
  min-width: 70px;
  text-align: center;
`

const SelectDevice = styled(BaseSelect)`
  flex: 1;
  min-width: 200px;
  text-align: center;
`

export default UnitGroupAutoSelect;
