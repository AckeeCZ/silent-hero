import React from "react";
import { Typography, Container } from "@material-ui/core";
import { period, maxKudosPerPeriod } from "../config/config";

export const Welcome = () => {
  return (<>
    <Container maxWidth="sm">
      <Typography variant="h2" align="center">Not all heroes wear capes</Typography>
      <img alt="" src="https://media1.giphy.com/media/l2JhH3WWHy8BMwMog/giphy.gif?cid=790b7611238c8276bd9805069889c0f677f164e0eb19833e&rid=giphy.gif" />
      <Typography variant="body1" align="justify" gutterBottom>
        Are you sometimes amazed how kind, brave, respectful or virtous ordinary people are? Let them know their actions don't go without notice. Send them a thank you card and inspire them and others.
      </Typography>
      <Typography variant="h4" align="justify" gutterBottom>How does it work?</Typography>
      <Typography variant="body1" align="justify" gutterBottom>
        <ol>
          <li>Every {period}, you have {maxKudosPerPeriod} kudos cards to send</li>
          <li>To send kudos to your hero, just select them from registered users and write a mesage</li>
          <li>You can browse the kudos you received or sent</li>
          <li>Anyone can see some of the rewarded heroes for the past {period}</li>
          <li>Some kudos might shown to public, if both hero and sender agree</li>
        </ol>
      </Typography>
      <Typography variant="body1" align="justify" gutterBottom>
        Thank you for helping us, helping you, help us all!
      </Typography>
    </Container>
  </>);
}
