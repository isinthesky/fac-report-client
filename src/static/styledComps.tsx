
import styled from "styled-components";

export const BaseInput = styled.input`
  height: 25px;
  padding:5px;
  font-size: 1em;
`;


export const BaseButton = styled.button`
  height: 25px;
  width: 100px;

  font-size: 1em;
`;


export const BaseLabel = styled.label`
  height: 25px;
  padding:5px;
  font-size: 1em;
`;


export const BaseRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  gap: 10px;
`;


export const BaseSelect = styled.select`
  height: 30px;
  padding:5px;
  font-size: 1em;

  gap: 10px;
`;


export const BaseOption = styled.option`
  height: 25px;
  padding:5px;
  font-size: 1em;

  gap: 10px;
`; 


export const BaseColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  gap: 10px;
`;


export const ActiveButton = styled.button`
  height: 25px;
  width: 100px;

  font-size: 1em;

  background-color: #a41024;
`;
