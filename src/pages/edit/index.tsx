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
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react/hooks";
import { UPDATE_USER, GET_ONE_USER } from "@/graphql/UserQueries";
import { useRouter } from "next/router";

const EditPerson = () => {
  const Router = useRouter();
  const { data, loading } = useQuery(GET_ONE_USER, {
    variables: {
      personByIdId: Router.query.id,
    },
  });

  const [state, setState] = useState<any>({});

  useEffect(() => {
    if (data) {
      setState({
        name: data.personById.name,
        father: data.personById.father,
        mother: data.personById.mother,
        email: data.personById.email,
        mobile: data.personById.mobile,
      });
    }
  }, [data]);

  const [updateSingleUser] = useMutation(UPDATE_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    updateSingleUser({
      variables: {
        updatePersonInput: {
          _id: Router.query.id,
          name: state.name,
          father: state.father,
          mother: state.mother,
          email: state.email,
          mobile: state.mobile,
        },
      },
    }).then(() => Router.push("/list"));
  };
  console.log("Router.query :>> ", state);

  if (loading) {
    return <TextField value="Loading..." />;
  }

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
                  value={state?.name}
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
                  value={state.father}
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
                  value={state.mother}
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
                  value={state.email}
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
                  value={state.mobile}
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
export default EditPerson;
