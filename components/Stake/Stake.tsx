import { useState } from 'react';
import { Group, Text, Stack, Input, Button } from '@mantine/core';
import { Connect } from '../Connect/Connect';
import { useWriteContract, useAccount } from 'wagmi';
import { contractABI } from '../../smartcontract/stake';
import axios from 'axios';

const contractAddress = '0x5063e2d72b2a3b4bdfb2ec1bb573fd806d3c5fa2';

export const Stake = () => {
  const [value, setValue] = useState('Stake 0.1ETH');
  const [signature, setSignature] = useState('');

  const { isConnected } = useAccount();

  const handleSubmit = async () => {
    console.log('loading');
    try {
      const response = await axios.post('http://localhost:5000/sign', {
        message: value,
      });
      console.log('signature:', response.data.signature);
      setSignature(response.data.signature);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const { writeContract, data } = useWriteContract();
  const verifySig = async () => {
    console.log('confirming...');
    const response = await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'verifyAndExecute',
      args: [value, signature],
    });
    console.log(response);
  };

  return (
    <>
      <Stack align="center">
        <Group justify="flex-end" p="lg" w="100%">
          <Connect />
          {isConnected ? 'connected' : 'connect'}
        </Group>
        <Stack w="50%" mt={50}>
          <Group justify="space-between" p="xs">
            <Group>
              <Text>Message: </Text>
              <Input
                className="custom-input"
                size="md"
                radius="lg"
                placeholder="Input message"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
              />
            </Group>
            <Button
              variant="filled"
              color="#B0A6EE"
              size="md"
              radius="lg"
              justify="space-between"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Group>
          <Group justify="space-between" p="xs">
            <Text>{'Signature: ' + signature.slice(0, 9) + '...' + signature.slice(-10, -1)}</Text>
            <Button
              variant="filled"
              color="#B0A6EE"
              size="md"
              radius="lg"
              justify="space-between"
              disabled={signature ? false : true}
              onClick={() => verifySig()}
            >
              Verify
            </Button>
          </Group>
          <Group justify="space-between" p="xs">
            <Text>Stake allowance: </Text>
            <Button
              variant="filled"
              color="#B0A6EE"
              size="md"
              radius="lg"
              justify="space-between"
              disabled
              onClick={() => {}}
            >
              Stake
            </Button>
          </Group>
          <Group justify="space-between" p="xs">
            <Text>Stake amount: </Text>
            <Button
              variant="filled"
              color="#B0A6EE"
              size="md"
              radius="lg"
              justify="space-between"
              disabled
              onClick={() => {}}
            >
              Withdraw
            </Button>
          </Group>
          <Stack mt={50}>
            <Text>1. Write something as message</Text>
            <Text>
              2. Submit your message then backend will check it and send signature back to you if no
              problem
            </Text>
            <Text>3. Get verified by smart contract (message & signature)</Text>
            <Text>4. Stake what you want</Text>
            <Text>5. Try to withdraw</Text>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
