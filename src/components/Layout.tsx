import React from "react";
import Container from '@material-ui/core/Container';

export class MainLayout extends React.Component<{}, {}> {
  render() {
    return (
      <Container maxWidth="xl">
        {this.props.children}
      </Container>
    );
  }
}
