import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Content from "./components/Containers";
// import { Container, Image } from "semantic-ui-react";
// import iconDevx from "./assets/icon-devx.svg";
import TransactionTable from "./components/TransactionTable";

import "./App.css";
import { Box, Heading } from "@chakra-ui/react";
import Payment from "./components/Payment";

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Header />
        <Content>
          <Box align="center">
            <Heading fontSize="1.7em" fontWeight={400}>
              Send Payments
            </Heading>
            <Payment />

            <Heading fontSize="1.7em" fontWeight={400}>
              Transaction History
            </Heading>
            <TransactionTable />
          </Box>
        </Content>
        <Footer />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
