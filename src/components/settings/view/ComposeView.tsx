import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeviceInfo from "./DeviceInfo";
import { ComposeProps, TabPageInfotype } from "../../../static/types";
import { RootStore } from "../../../store/congifureStore";

const ComposeView: React.FC<ComposeProps> = ({ row, column}) => {
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);

  useEffect(() => {
    (async () => {
      try {
        renderButtons();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [deviceSet]);

  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${settingSet.selectedTab.main}${settingSet.selectedTab.sub}`;
    const tabPageInfo = tabPageSet[key] as TabPageInfotype;

    console.log("optionlist[key].unitList", tabPageSet, key, tabPageSet[key])
    
    for (let r = 0; r < row * column; r++) {

      if (tabPageInfo) {
          if (tabPageInfo.unitList.length < 1) return;

          if (tabPageInfo.unitList.length > 0) {

            rows.push(
              <DeviceInfo
                key={keyCounter}
                type={tabPageInfo.unitList[keyCounter].type}
                name={tabPageInfo.unitList[keyCounter].name}
                id={keyCounter+1}
                st={tabPageInfo.unitList[keyCounter].st}
                div={tabPageInfo.unitList[keyCounter].div}
                dvList={tabPageInfo.unitList[keyCounter].dvList}
              />
            );
          } 
          keyCounter++;
      }
      
    }

    return rows;
  };

  return (
    <ColumnContainer>
      {renderButtons()}
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  margin: 30px;
`;

export default ComposeView;