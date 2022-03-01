import { Box, Stack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Payments from "../abis/Payments.json";
import Web3 from "web3";

function Payment() {
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [amount, setAmount] = useState();

  //   React.useEffect(() => {
  //     console.log(amount, "amount");
  //     console.log(userAddress, "address");
  //   }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function getPayment() {
    loadWeb3();
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    const contractData = Payments.networks[networkId];
    if (contractData) {
      const paymentContract = new web3.eth.Contract(
        Payments.abi,
        contractData.address
      );
      setLoading(true);
      await paymentContract.methods
        .sendOut(userAddress)
        .send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") })
        .on("transactionHash", (hash) => {
          setLoading(false);
          setUserAddress("");
          setAmount("");
          window.alert(`Transaction Success! ${hash} `);
        });
    } else {
      window.alert("Payments contract not deployed to detected network.");
    }
  }
  return (
    <>
      <Box mt="2em" mb="4em" align="center">
        <Stack alignItems="center" w="40%" spacing={3}>
          <Input
            variant="filled"
            placeholder="Address - 0x00"
            type="text"
            value={userAddress}
            onChange={(e) => {
              setUserAddress(e.target.value);
            }}
          />
          <Input
            variant="filled"
            placeholder="Amount - 1Matic"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />

          <Button
            isLoading={loading}
            colorScheme="gray"
            loadingText="Sending..."
            onClick={getPayment}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default Payment;
