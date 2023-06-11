import Wrapper from "@/components/Wrapper";
import { useQuery } from "@apollo/client/react";
import { ALL_USER } from "@/graphql/UserQueries";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const columns = [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "father", headerName: "Father Name", width: 150 },
  { field: "mother", headerName: "Mother Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "mobile", headerName: "Mobile", width: 150 },
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

  return (
    <Wrapper>
      <Typography sx={{ margin: "10px" }} variant="h4">
        User List
      </Typography>
      <DataGrid columns={columns} rows={rowData} getRowId={(row) => row?._id} />
    </Wrapper>
  );
};

export default ListUser;
