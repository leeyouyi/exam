import styled from "styled-components";

export const Style = styled.div`
  .flex {
    display: flex;
    box-sizing: border-box;
  }
  .dashed {
    width: 182px;
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
  span.square {
    color: blue;
    cursor: pointer;
  }
  span.minus {
    color: #67b1dd;
    border: 1px solid #67b1dd;
  }
  span.plus {
    color: #2895d6;
    border: 1px solid #2895d6;
  }

  span.disabled {
    cursor: auto;
    background-color: #efefef;
    border-color: rgba(118, 118, 118, 0.3);
  }

  span:focus {
    outline: 2px rgb(83, 140, 239) solid;
  }

  input {
    text-align: center;
  }

  input:focus {
    outline: 2px rgb(83, 140, 239) solid;
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
