import React from 'react';

import { Divider, HDiv, ProtocolTableWrapper, Text } from './styled';

const ProtocolTable = () => {
  return (
    <ProtocolTableWrapper>
      <HDiv>
        <Text>
          <b>Protocol TVL</b>
        </Text>
        <Text>
          <b>$1,182,215.21</b>
        </Text>
      </HDiv>
      <HDiv mt='1.094vw'>
        <Text>Bank</Text>
        <Text>$856,215.62</Text>
      </HDiv>
      <Divider />
      <HDiv>
        <Text>Farm</Text>
        <Text>$1,226,295.02</Text>
      </HDiv>
      <Divider />
      <HDiv>
        <Text>Stake</Text>
        <Text>$569,321.64</Text>
      </HDiv>
    </ProtocolTableWrapper>
  );
};

export default ProtocolTable;
