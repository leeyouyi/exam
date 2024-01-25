import styled from "styled-components";

export const Style = styled.div`
  .flex {
    display: flex;
    box-sizing: border-box;
  }
  .dashed {
    width: 182px;
    border: 1px dashed #ccc;
    gap: 8px;
    padding: 8px;
  }
  .square {
    width: 48px;
    height: 48px;
    font-size: 16px;
    border: 1px solid #ccc;
    justify-content: center;
    align-items: center;
  }
  .blue {
    color: blue;
    cursor: pointer;
  }
  input {
    text-align: center;
  }
  /* Chrome, Safari, Edge, Opera */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
