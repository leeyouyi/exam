import styled from "styled-components";

export const Style = styled.div`
  .warp {
    box-sizing: border-box;
    padding: 15px;
    max-width: 900px;
    margin: 0 auto;
  }
  .tootip {
    width: 100%;
    div {
      padding: 15px;
      margin: 15px 0;
      background-color: #f1fdff;
      box-sizing: border-box;
    }
  }
  .room {
    padding: 15px 0px;
    border-bottom: 1px solid #ccc;
    .title {
      margin-bottom: 5px;
    }
    .flex {
      display: flex;
      padding: 5px 0;
    }
    .between {
      justify-content: space-between;
      align-items: flex-start;
    }
    .adult {
      p {
        padding: 10px 10px 0px 10px;
        font-size: 16px;
        font-weight: bold;
      }
      span {
        padding: 0 10px;
        color: #c9c9c9;
        font-size: 14px;
      }
    }
    .child {
      p {
        padding: 10px 10px 0px 10px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
`;
