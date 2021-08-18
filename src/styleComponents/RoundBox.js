import styled from "styled-components";
import { color, layout, space } from "styled-system";


const RoundBox = styled.div`
    
    border-radius:2.3rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
    overflow:hidden;
    ${color}
    ${space}
    ${layout}
`

export default RoundBox;