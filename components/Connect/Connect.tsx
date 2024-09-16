import { Button } from '@mantine/core';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

// Define Injected Connector for Sepolia network only
const injected = new InjectedConnector({
  supportedChainIds: [11155111], // Sepolia Testnet Chain ID
});

export const Connect = () => {
  const { account, isActive, connector } = useWeb3React();

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      await connector.activate(injected);
    } catch (error) {
      console.error('Connection error', error);
    }
  };

  return (
    <>
      <Button
        variant="filled"
        color="#B0A6EE"
        size="md"
        radius="lg"
        mr="xl"
        onClick={connectWallet}
      >
        {!isActive ? 'Connect' : account?.slice(0, 7) + '...' + account?.slice(-5, -1)}
      </Button>
    </>
  );
};
