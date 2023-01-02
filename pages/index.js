import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import useData from "../src/components/useData";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Copyright from "../src/Copyright";

export default function Index() {
  const {
    isLoading,
    returnData,
    error,
    getData,
    createData,
    updateData,
    deleteData,
  } = useData("posts");

  const handleAdd = () => {
    //Simulate creation post
    let post = {
      title: "Test Post",
      body: "Test Creation Post",
      userId: Math.max(...returnData.map((d) => d.userId)) + 1,
    };
    createData("posts", post);
  };

  const handleUpdate = (post) => {
    updateData(`posts/${post.id}`, post);
  };
  const handleRemove = (post) => {
    deleteData(`posts/${post.id}`, post.id);
  };

  return (
    <>
      {error ? <p>Error fetching data {error}</p> : null}
      {isLoading ? (
        <p>Data Loading...</p>
      ) : (
        <>
          <Typography
            align="center"
            variant="h1"
            sx={{ fontSize: 26, fontWeight: 500 }}
          >
            Custom Hook to Fetch Data
          </Typography>
          <Grid container direction="column" m={1} spacing={2}>
            <Grid item>
              <Typography variant="h1" sx={{ fontSize: 26, fontWeight: 500 }}>
                POSTS
              </Typography>
            </Grid>
            <Grid item>Post Count: {returnData.length}</Grid>
            <Grid item container spacing={2}>
              <Grid item>
                <Button variant="outlined" onClick={() => getData("posts")}>
                  Reset Posts
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleAdd}
                >
                  Add Post
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: "90%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Post Id</TableCell>
                  <TableCell>User Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnData.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.body}</TableCell>
                    <TableCell onClick={() => handleUpdate(row)}>
                      <ModeEditOutlineOutlinedIcon
                        fontSize="large"
                        sx={{ color: "blue" }}
                      />
                    </TableCell>
                    <TableCell onClick={() => handleRemove(row)}>
                      <DeleteForeverIcon
                        fontSize="large"
                        sx={{ color: "red" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Copyright />
        </>
      )}
    </>
  );
}
