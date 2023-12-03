import React from "react";
import styled from "styled-components";
import { FONTSET_MAIN_MENU_SIZE } from "../../static/fontSet";
import { COLORSET_FONT_HIGHLIGHT, COLORSET_HEADER_BG } from "../../static/colorSet";


interface MainMenuProps {
  onClickCallback: (id: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onClickCallback }) => {
  return (
    <>
      {["1", "2", "3", "4", "5"].map((id) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${id}`]) {
          return (
            <FlatButton
              key={id}
              onClick={() => {
                onClickCallback(id);
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${id}`] ||
                `REPORT_TYPE${id}`}
            </FlatButton>
          );
        } else {
          return <div key={id} />;
        }
      })}
    </>
  );
};

interface SubMenuProps {
  mainId: string;
  onClickCallback: (mainId: string, subId: string) => void;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  mainId,
  onClickCallback,
}) => {
  return (
    <>
      {["1", "2", "3", "4", "5"].map((id) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${id}`]) {
          return (
            <MarginButton
              key={id}
              onClick={() => {
                onClickCallback(mainId, id);
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${id}`] ||
                `TYPE${mainId}_Sub${id}`}
            </MarginButton>
          );
        } else {
          return <div key={id} />;
        }
      })}
    </>
  );
};

const FlatButton = styled.button<{BGColor?: string, fontcolor?: string, fontsize?: string }>`
  height: 45px;
  color:  ${(props) => props.fontsize || COLORSET_FONT_HIGHLIGHT};
  background-color: ${(props) => props.fontsize || COLORSET_HEADER_BG};
  border: 0px solid #333;
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_SIZE};
`;

const MarginButton = styled.button<{ fontsize?: string }>`
  height: 25px;
  color:  ${(props) => props.fontsize || COLORSET_FONT_HIGHLIGHT};
  background-color: ${(props) => props.fontsize || COLORSET_HEADER_BG};
  border: 0px solid #333;
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_SIZE};
`;