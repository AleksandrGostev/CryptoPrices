import styled from "styled-components";
import { device } from "../../utils";

export default styled.div`
  .ant-card-head-title {
    padding: 20px;
    
    .name {
      font-size: 1.6em;
      font-weight: 600;
    }
    .symbol {
      color: gray;
    }
  }

  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  
    @media ${device.md} {
      flex-direction: row;
      gap: 40px;
    }
  }
  
  .conversion-table {
    margin-top: 30px;
  }

  .currency-icon {
    border-radius: 50%;
  }
`;
