import React from "react";
import Container from '@material-ui/core/Container';
import { Toolbar, Typography, AppBar, makeStyles, createStyles, Theme, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { UserWidget } from "./UserWidget";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#1B97C6'
    }
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Silent hero.
          </Typography>
          <UserWidget />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        {children}
      </Container>
    </ThemeProvider>
  );
}
