import Wrapper from "@/components/Wrapper";
import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_USER, DELETE_USER } from "@/graphql/UserQueries";
import { DataGrid, GridColDef, GridApi, GridKeyValue } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@mui/material";
import { useRouter } from "next/router";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "father", headerName: "Father Name", width: 150 },
  { field: "mother", headerName: "Mother Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "mobile", headerName: "Mobile", width: 150 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const [removeUser] = useMutation(DELETE_USER);
      const onClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        console.log("parems :>> ", params.id);
        try {
          removeUser({
            variables: {
              removePersonId: params.id,
            },
          }).then(() => {
            window.location.reload();
          });
        } catch (err) {
          console.log(err);
        }
      };

      return <Button onClick={onClick}>Delete</Button>;
    },
  },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    renderCell: (params) => {
      const Router = useRouter();
      const onClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        Router.push({
          pathname: "/edit",
          query: {
            id: params?.id,
          },
        });
      };

      return <Button onClick={onClick}>Edit</Button>;
    },
  },
];

const ListUser = () => {
  const [rowData, setRowData] = useState([]);
  const { loading, data } = useQuery(ALL_USER, {
    variables: {
      limit: null,
      skip: null,
    },
  });
  console.log("data :>> ", rowData);
  useEffect(() => {
    if (data) setRowData(data?.getAllPerson?.person);
  }, [data]);

  const modifiedRow = rowData?.map((item: any) => ({
    ...item,
  }));

  return (
    <Wrapper>
      <Typography sx={{ margin: "10px" }} variant="h4">
        User List
      </Typography>
      <Grid sx={{ height: "500px", overflow: "hidden" }}>
        <DataGrid
          columns={columns}
          rows={modifiedRow}
          getRowId={(row) => row?._id}
        />
      </Grid>
    </Wrapper>
  );
};

export default ListUser;
