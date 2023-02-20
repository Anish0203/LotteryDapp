import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Paper, Grid } from "@mui/material";
import Lottery from "./artifacts/contracts/Lottery.sol/Lottery.json";
import { ethers } from "ethers";

const contractAddress = "0x3A72879B293Dc1eef9D3db8562Cc830D274c4B70";
const contractAbi = Lottery.abi;

const App = () => {
  const [recentWinner, setRecentWinner] = useState(null);
  const [numOfPlayers, setNumOfPlayers] = useState(0);

  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const enterLottery = async () => {
    try{
      console.log("Entering");
      await contract.enterLottery({value: ethers.utils.parseEther("0.01")});
      let num = await contract.getNumberOfPlayers();
      console.log("Entered", num);
      console.log(num.toNumber());
      setNumOfPlayers(num.toNumber());
      console.log("Done");
    }catch(error){
      console.log(error);
    }
  };

  const requestRandomWinner = async () => {
    try{
      console.log("Requesting....");
      await contract.requestRandomWinner({gasLimit: 5000000});
      let winner = await contract.getRecentWinner();
      setNumOfPlayers(0);
      setRecentWinner(winner);
    }catch(error){
      console.log(error);
    }
  };

  const connectWallet = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        console.log(contract);
        console.log(address);
        setContract(contract);
        setProvider(provider);
      } else {
        console.log("Metamask is not installed");
      }
    };
    provider && loadProvider();
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lottery Contract
        </Typography>


        <Grid container spacing={2}>
        <Grid item xs={12}>
        {account ? (
          <div>
            <Button
              sx={{ m: 2 }}
              onClick={connectWallet}
              variant="contained"
              disabled
            >
              Connect
            </Button>
            {account}
          </div>
        ) : (
          <Button sx={{ m: 2 }} onClick={connectWallet} variant="contained">
            Connect
          </Button>
        )}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={enterLottery}
            >
              Enter Lottery
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={requestRandomWinner}
            >
              Request Random Winner
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Recent Winner: {recentWinner || "None"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Players: {numOfPlayers}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
