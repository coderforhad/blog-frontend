import Wrapper from "@/components/Wrapper";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMutation } from "@apollo/client/react/hooks";
import { CREATE_USER } from "@/graphql/UserQueries";
import { useRouter } from "next/router";

const FormFillUp = () => {
  const [state, setState] = useState({});
  const [createSingleUser] = useMutation(CREATE_USER);
  const Router = useRouter();
  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    createSingleUser({
      variables: {
        createPersonInput: {
          name: state.name,
          father: state.father,
          mother: state.mother,
          email: state.email,
          mobile: state.mobile,
        },
      },
    }).then(() => Router.push("/list"));
  };
  return (
    <Wrapper>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          marginLeft: "30%",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4">User Form</Typography>
        <Card>
          <CardContent>
            <Grid sx={{ margin: "20px", padding: "10px" }}>
              <Grid sx={{ padding: "10px" }}>
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  fullWidth
                  name="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid sx={{ padding: "10px" }}>
                <TextField
                  id="standard-basic"
                  label="Father Name"
                  variant="standard"
                  fullWidth
                  name="father"
                  onChange={handleChange}
                />
              </Grid>
              <Grid sx={{ padding: "10px" }}>
                <TextField
                  id="standard-basic"
                  label="Mother Name"
                  variant="standard"
                  fullWidth
                  name="mother"
                  onChange={handleChange}
                />
              </Grid>
              <Grid sx={{ padding: "10px" }}>
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  fullWidth
                  name="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid sx={{ padding: "10px" }}>
                <TextField
                  id="standard-basic"
                  label="Mobile"
                  variant="standard"
                  fullWidth
                  name="mobile"
                  onChange={handleChange}
                />
              </Grid>
              <Grid sx={{ padding: "20px 0px" }}>
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Wrapper>
  );
};
export default FormFillUp;
