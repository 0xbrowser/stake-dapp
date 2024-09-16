import { useState, useCallback, useEffect } from 'react';
import { Group, Text, Stack, Input, Button } from '@mantine/core';
import { Connect } from '../Connect/Connect';
import { contractABI } from '../../smartcontract/stake';
import axios from 'axios';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

const contractAddress = '0xddf7670719e77c54567ab95a20a4b4a455ae3895';

export const Stake = () => {
  const [value, setValue] = useState('Stake 0.1ETH');
  const [allowance, setAllowance] = useState('');
  const [amount, setAmount] = useState('');
  const [signature, setSignature] = useState({
    messageHash: '',
    r: '',
    s: '',
    signature: '',
    v: '',
  });
  const { account, isActive, connector } = useWeb3React();

  const handleSubmit = async () => {
    console.log('loading');
    try {
      const response = await axios.post('http://localhost:5000/sign', {
        message: value,
      });
      console.log('signature:', response.data);
      setSignature(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const verifySig = () => {
    if (isActive && connector.provider) {
      const web3 = new Web3(connector.provider);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const callVerifySig = async () => {
        try {
          console.log('try to call verifyAndExecute...');
          await contract.methods
            .verifyAndExecute(value, signature.signature)
            .send({ from: account });
          console.log('done');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      callVerifySig();
    } else {
      alert('You must connect to your wallet first!');
    }
  };

  const callStake = () => {
    if (isActive && connector.provider) {
      const web3 = new Web3(connector.provider);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const callStakeFunc = async () => {
        try {
          console.log('try to call stake...');
          await contract.methods.stake().send({ from: account, value: allowance });
          console.log('done');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      callStakeFunc();
    } else {
      alert('You must connect to your wallet first!');
    }
  };

  const callWithdraw = () => {
    if (isActive && connector.provider) {
      const web3 = new Web3(connector.provider);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const callWithdrawFunc = async () => {
        try {
          console.log('try to call withdraw...');
          await contract.methods.withdraw(amount).send({ from: account });
          console.log('done');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      callWithdrawFunc();
    } else {
      alert('You must connect to your wallet first!');
    }
  };

  useEffect(() => {
    const getOnchainData = setInterval(() => {
      if (isActive && connector.provider) {
        const web3 = new Web3(connector.provider);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const callWithdrawFunc = async () => {
          try {
            // update allowance
            await contract.methods
              .getStakeAllowance(account)
              .call()
              .then((_allowance) => {
                console.log('allowance: ', _allowance);
                setAllowance(_allowance.toString());
              });
            // update amount
            await contract.methods
              .getStakeAmount(account)
              .call()
              .then((_amount) => {
                console.log('amount: ', _amount);
                setAmount(_amount.toString());
              });
          } catch (error) {
            console.error('Error:', error);
          }
        };
        callWithdrawFunc();
      }
    }, 5000);

    return () => clearInterval(getOnchainData);
  }, []);

  return (
    <>
      <Stack align="center">
        <Group justify="flex-end" p="lg" w="100%">
          <Connect />
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
            <Group>
              <Text>Signature:</Text>
              {signature && (
                <Text>
                  {signature.signature?.slice(0, 9) + '...' + signature.signature?.slice(-10, -1)}
                </Text>
              )}
            </Group>
            <Button
              variant="filled"
              color="#B0A6EE"
              size="md"
              radius="lg"
              justify="space-between"
              disabled={signature.signature ? false : true}
              onClick={() => verifySig()}
            >
              Verify
            </Button>
          </Group>
          <Group justify="space-between" p="xs">
            <Group>
              <Text>Stake allowance: </Text>
              <Text>{allowance !== null && `${Number(allowance) / 10 ** 18} ETH`}</Text>
            </Group>
            <Button
              variant="filled"
              color="#B0A6EE"
              size="md"
              radius="lg"
              justify="space-between"
              disabled={allowance ? false : true}
              onClick={callStake}
            >
              Stake
            </Button>
          </Group>
          <Group justify="space-between" p="xs">
            <Group>
              <Text>Staking amount: </Text>
              <Text>{amount !== null && `${Number(amount) / 10 ** 18} ETH`}</Text>
            </Group>
            <Button
              variant="filled"
              color="#B0A6EE"
              size="md"
              radius="lg"
              justify="space-between"
              disabled={amount ? false : true}
              onClick={callWithdraw}
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
            <Text>4. Try to stake allowance amount ETH</Text>
            <Text>5. Try to withdraw staking amount ETH</Text>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
