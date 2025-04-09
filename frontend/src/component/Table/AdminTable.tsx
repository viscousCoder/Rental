import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Pagination,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material";
import {
  deleteUser,
  fetchUsersByRole,
  updateUserBlockedStatus,
} from "../../store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Loading from "../Loading/Loading";

// Data Types
interface User {
  id: string;
  fullname: string;
  email: string;
  mobile: string;
  userrole: string;
  blocked: boolean;
  created_at: string;
  updated_at: string;
}

const AdminTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users } = useSelector((state: RootState) => state.admin);
  const [activeTab, setActiveTab] = useState<
    "Property Owner" | "Tenant" | "Admin"
  >("Property Owner");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(
      fetchUsersByRole({
        userrole: activeTab,
      })
    );
  }, [activeTab]);

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: "Property Owner" | "Tenant" | "Admin"
  ) => {
    setActiveTab(newValue);
    setSearchQuery("");
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (
    event: SelectChangeEvent<string | number>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery)
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!selectedUser) return;
    dispatch(
      updateUserBlockedStatus({
        userId: selectedUser?.id,
        blocked: selectedUser?.blocked,
      })
    );
    setEditDialogOpen(false);
  };

  const handleDelete = (user: User) => {
    dispatch(deleteUser({ userId: user?.id }));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ p: 3, bgcolor: "#f5f5f5" }}>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
              Management
            </Typography>
            <Button variant="contained" startIcon={<Add />} color="primary">
              Add New
            </Button>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Tenant" value="Tenant" />
            <Tab label="Property Owner" value="Property Owner" />
            <Tab label="Admin" value="Admin" />
          </Tabs>

          <TextField
            fullWidth
            placeholder="Search by name, email, or contact..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Blocked</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {paginatedUsers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Typography align="center">No user found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    // paginatedUsers.map((user) => (
                    //   <TableRow key={user.id}>
                    //     <TableCell>{user.id}</TableCell>
                    //     <TableCell>{user.fullname}</TableCell>
                    //     <TableCell>{user.mobile}</TableCell>
                    //     <TableCell>{user.email}</TableCell>
                    //     <TableCell>{user.userrole}</TableCell>
                    //     <TableCell>{user.blocked ? "True" : "False"}</TableCell>
                    //     <TableCell>{typedUser.blocked ? "True" : "False"}</TableCell>
                    //     <TableCell>
                    //       <IconButton
                    //         onClick={() => handleEditClick(user)}
                    //         color="primary"
                    //       >
                    //         <Edit />
                    //       </IconButton>
                    //       <IconButton
                    //         color="error"
                    //         onClick={() => handleDelete(user)}
                    //       >
                    //         <Delete />
                    //       </IconButton>
                    //       <IconButton color="info">
                    //         <Visibility />
                    //       </IconButton>
                    //     </TableCell>
                    //   </TableRow>
                    // ))
                    paginatedUsers.map((user) => {
                      const typedUser = user as unknown as User;
                      return (
                        <TableRow key={typedUser.id}>
                          <TableCell>{typedUser.id}</TableCell>
                          <TableCell>{typedUser.fullname}</TableCell>
                          <TableCell>{typedUser.mobile}</TableCell>
                          <TableCell>{typedUser.email}</TableCell>
                          <TableCell>{typedUser.userrole}</TableCell>
                          <TableCell>
                            {typedUser.blocked ? "True" : "False"}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleEditClick(typedUser)}
                              color="primary"
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(typedUser)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </>
                {/* {} */}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <FormControl size="small">
              <InputLabel>Rows per page</InputLabel>
              <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>

          {/* Edit Dialog */}
          <Dialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
          >
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Blocked</InputLabel>
                <Select
                  value={selectedUser?.blocked ? "true" : "false"}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser!,
                      blocked: e.target.value === "true",
                    })
                  }
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => handleEditSave()} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default AdminTable;
