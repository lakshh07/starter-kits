import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";

require("dotenv").config();
const axios = require("axios").default;

function TransactionTable() {
  const { account } = useWeb3React();
  const [history, setHistory] = useState();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDate = (miliseconds) => {
    const d = new Date(miliseconds);
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${month} ${date}, ${year}`;
  };

  const getHistory = (address) => {
    axios({
      method: "get",
      url: `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`,
      responseType: "json",
    }).then(function (response) {
      // console.log(response.data.result);
      setHistory(response.data.result);
    });
  };

  useEffect(() => {
    setInterval(() => {
      getHistory(account);
    }, 7000);
    // getHistory(account);
    console.log(history, "history");
  }, [history, account]);

  return (
    <>
      <Box mt="4em">
        <Table mb="5em" variant="simple" w="60%">
          <Thead>
            <Tr>
              <Th>Timestamp</Th>
              <Th>Txn Hash</Th>
              <Th>To</Th>
              <Th>Value</Th>
              <Th isNumeric>Block No</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {history &&
              history
                .map((list, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{getDate(parseInt(list.timeStamp) * 1000)}</Td>
                      <Td>
                        <Link
                          href={`https://polygonscan.com/tx/${list.hash}`}
                          isExternal
                        >
                          {list.hash.substr(0, 8)}...
                        </Link>
                      </Td>
                      <Td>
                        {list.to.substr(0, 6)}...{list.to.substr(-4)}
                      </Td>
                      <Td isNumeric>{list.value / 1000000000000000000}</Td>
                      <Td isNumeric>{list.blockNumber}</Td>
                      {list.txreceipt_status ? (
                        <Td color="green">Success</Td>
                      ) : (
                        <Td color="red">Fail</Td>
                      )}
                    </Tr>
                  );
                })
                .reverse()}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default TransactionTable;
