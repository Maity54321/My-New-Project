import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { MdEditSquare, MdDelete } from "react-icons/md";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  createUserRequest,
  deleteUserRequest,
  fetchAllUsers,
  singleUserRequest,
} from "../redux/userActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { Country, State } from "country-state-city";

export default function UserTable() {
  const rowsPerPage = 5;

  const columns = [
    { field: "id", headerName: "ID", minWidth: 300, flex: 1 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: false,
      flex: 1,
      sortable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: false,
      flex: 1,
      sortable: false,
    },
    {
      field: "age",
      headerName: "Age",
      // type: 'number',
      width: 110,
      editable: false,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Stack direction="row" spacing={2}>
            <MdEditSquare
              fontSize={20}
              color="blue"
              className="cursor-pointer"
              onClick={(e) => handleEdit(params.row.id, e)}
            />
            <MdDelete
              fontSize={22}
              color="red"
              className="cursor-pointer"
              onClick={() => handleDelete(params.row.id)}
            />
          </Stack>
        );
      },
    },
  ];

  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyWebsite: "",
    companyName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    state: "",
  });

  const [editUsers, setEditUsers] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyWebsite: "",
    companyName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    state: "",
  });

  const {
    firstName,
    lastName,
    email,
    phone,
    companyWebsite,
    companyName,
    address,
    city,
    postalCode,
    country,
    state,
  } = users;

  const updateModel = (params: any) => {
    console.log(params);
    return {
      id: params.id,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      phone: params.phone,
      companyWebsite: params.companyWebsite,
      companyName: params.companyName,
      address: params.address,
      city: params.city,
      postalCode: params.postalCode,
      country: params.country,
      state: params.state,
    };
  };

  const handleSubmit = (e: any): any => {
    e.preventDefault();
    dispatch(createUserRequest(users));
    e.target.reset();
    handleClose();
  };

  const handleChange = (e: any) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    setEditUsers({ ...editUsers, [e.target.name]: e.target.value });
  };

  const handleDelete = (id: any) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteUserRequest(id));
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setEditUsers(updateModel(data));
  };
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    handleClose();
    setUsers(users);
  };

  const dispatch = useDispatch();
  let { data } = useSelector((state: any) => state.userReducer);
  let { status } = useSelector((state: any) => state.userReducer);
  const [row, setRow] = React.useState([]);
  console.log(data);
  console.log(status);

  const handleEdit = (id: any, e: any) => {
    handleOpen();
    dispatch(singleUserRequest(id));
    handleChange(e);
    setEditUsers(updateModel(data));
  };

  let [pageNumber, setPageNumber] = useState(1);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      pageNumber = --pageNumber;
      setPageNumber(pageNumber);
    }
  };

  const paginationData = {
    page: pageNumber,
    limit: 10,
  };

  useEffect(() => {
    dispatch(fetchAllUsers(paginationData));
    if (data !== undefined && data.length !== 0) {
      setRow(data);
    }
  }, [data !== undefined, data.length !== 0, status == 200, pageNumber]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <TableContainer component={Paper} sx={{ height: 530 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ textAlign: "center" }}>
                <TableCell>Id</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.firstName + item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {
                      <MdEditSquare
                        color="blue"
                        fontSize={20}
                        className="cursor-pointer"
                        onClick={(e) => handleEdit(item.id, e)}
                      />
                    }
                  </TableCell>
                  <TableCell>
                    {
                      <MdDelete
                        color="red"
                        fontSize={20}
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      />
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Modal Section */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Stack direction="column" justifyContent="center" gap={5}>
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                name="firstName"
                label="FirstName"
                value={editUsers?.id ? editUsers?.firstName : users.firstName}
                onChange={handleChange}
              />
              <TextField
                name="lastName"
                label="LastName"
                onChange={handleChange}
              />
              <TextField name="email" label="Email" onChange={handleChange} />
              <TextField name="phone" label="Phone" onChange={handleChange} />
            </Stack>
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                name="companyWebsite"
                label="Company Website"
                onChange={handleChange}
              />
              <TextField
                name="companyName"
                label="Company Name"
                onChange={handleChange}
              />
              <TextField
                name="address"
                label="Address"
                onChange={handleChange}
              />
              <TextField name="city" label="City" onChange={handleChange} />
            </Stack>
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                name="postalCode"
                label="Postal Code"
                onChange={handleChange}
              />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" gap={5} marginTop={5}>
            <Box>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
      <Box>
        <Button
          variant="contained"
          onClick={previousPage}
          sx={{ marginTop: 2 }}
        >
          Prev
        </Button>
        <Button variant="contained" onClick={nextPage} sx={{ marginTop: 2 }}>
          Next
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: 28,
            color: "white",
            fontSize: 30,
            bottom: 20,
            right: 20,
            position: "fixed",
          }}
          onClick={handleOpen}
        >
          +
        </Button>
      </Box>
    </>
  );
}
