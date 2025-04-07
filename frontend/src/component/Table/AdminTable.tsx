// import React, { useState } from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Typography,
//   Pagination,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import {
//   Edit,
//   Delete,
//   Add,
//   Search,
//   Person,
//   Home,
//   AdminPanelSettings,
//   Visibility,
// } from "@mui/icons-material";

// const dummyData = {
//   tenants: [
//     {
//       id: "T001",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T002",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T003",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T004",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T005",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T006",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T007",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T008",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T009",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0010",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0011",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T0012",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0013",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0014",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T0015",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T00112",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0021",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T0031",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0041",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0051",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T0061",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0071",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T0081",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T0091",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T00101",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T00111",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T00121",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T00131",
//       name: "John Smith",
//       contact: "+1 234-567-8901",
//       email: "john.smith@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "T00141",
//       name: "Alice Brown",
//       contact: "+1 345-678-9012",
//       email: "alice.brown@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//     {
//       id: "T00151",
//       name: "Bob Johnson",
//       contact: "+1 456-789-0123",
//       email: "bob.j@email.com",
//       status: "Active",
//       blocked: false,
//     },

//     // Add more dummy data as needed
//   ],
//   owners: [
//     {
//       id: "O001",
//       name: "Robert Johnson",
//       contact: "+1 987-654-3210",
//       email: "robert@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "O002",
//       name: "Emma Williams",
//       contact: "+1 876-543-2109",
//       email: "emma@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//   ],
//   admins: [
//     {
//       id: "A001",
//       name: "David Miller",
//       contact: "+1 765-432-1098",
//       email: "david@email.com",
//       status: "Active",
//       blocked: false,
//     },
//     {
//       id: "A002",
//       name: "Sophia Wilson",
//       contact: "+1 654-321-0987",
//       email: "sophia@email.com",
//       status: "Inactive",
//       blocked: true,
//     },
//   ],
// };

// const AdminTable: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("tenants");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [data, setData] = useState(dummyData);

//   const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
//     setActiveTab(newValue);
//     setSearchQuery("");
//     setPage(1);
//   };

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   const handleRowsPerPageChange = (
//     event: React.ChangeEvent<{ value: unknown }>
//   ) => {
//     setRowsPerPage(event.target.value as number);
//     setPage(1);
//   };

//   const filteredData = data[activeTab].filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.contact.includes(searchQuery)
//   );

//   const paginatedData = filteredData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//     setEditDialogOpen(true);
//   };

//   const handleViewClick = (item) => {
//     setSelectedItem(item);
//     setViewDialogOpen(true);
//   };

//   const handleEditSave = () => {
//     const updatedData = {
//       ...data,
//       [activeTab]: data[activeTab].map((item) =>
//         item.id === selectedItem.id ? selectedItem : item
//       ),
//     };
//     setData(updatedData);
//     setEditDialogOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         p: 3,
//         bgcolor: "#f5f5f5",
//         height: "calc(100rem - 36rem)",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" color="primary">
//           {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           sx={{ bgcolor: "#1976d2" }}
//         >
//           Add New
//         </Button>
//       </Box>

//       {/* Tabs */}
//       <Tabs
//         value={activeTab}
//         onChange={handleTabChange}
//         indicatorColor="primary"
//         textColor="primary"
//         sx={{ mb: 2 }}
//       >
//         <Tab icon={<Person />} label="Tenants" value="tenants" />
//         <Tab icon={<Home />} label="Owners" value="owners" />
//         <Tab icon={<AdminPanelSettings />} label="Admins" value="admins" />
//       </Tabs>

//       {/* Search Bar */}
//       <TextField
//         fullWidth
//         placeholder="Search by name, email, or contact..."
//         variant="outlined"
//         size="small"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         InputProps={{
//           startAdornment: <Search sx={{ mr: 1, color: "grey.500" }} />,
//         }}
//         sx={{ mb: 2, bgcolor: "white" }}
//       />

//       {/* Table */}
//       <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ bgcolor: "#1976d2" }}>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 ID
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 Name
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 Contact
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 Email
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 Status
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 Blocked
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((row) => (
//               <TableRow key={row.id} hover>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.contact}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                 <TableCell>
//                   <Button
//                     size="small"
//                     variant="contained"
//                     sx={{
//                       bgcolor: row.status === "Active" ? "green" : "red",
//                       color: "white",
//                     }}
//                   >
//                     {row.status}
//                   </Button>
//                 </TableCell>
//                 <TableCell>{row.blocked ? "True" : "False"}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     onClick={() => handleEditClick(row)}
//                   >
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="error">
//                     <Delete />
//                   </IconButton>
//                   <IconButton color="info" onClick={() => handleViewClick(row)}>
//                     <Visibility />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       {filteredData.length > 0 && (
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mt={2}
//         >
//           <FormControl size="small">
//             <InputLabel>Rows per page</InputLabel>
//             <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={15}>15</MenuItem>
//             </Select>
//           </FormControl>
//           <Pagination
//             count={Math.ceil(filteredData.length / rowsPerPage)}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             shape="rounded"
//           />
//         </Box>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>Edit {selectedItem?.name}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Blocked</InputLabel>
//             <Select
//               value={selectedItem?.blocked ? "true" : "false"}
//               onChange={(e) =>
//                 setSelectedItem({
//                   ...selectedItem,
//                   blocked: e.target.value === "true",
//                 })
//               }
//             >
//               <MenuItem value="true">True</MenuItem>
//               <MenuItem value="false">False</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleEditSave} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* View Dialog */}
//       <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
//         <DialogTitle>View {selectedItem?.name}</DialogTitle>
//         <DialogContent>
//           <Typography>ID: {selectedItem?.id}</Typography>
//           <Typography>Name: {selectedItem?.name}</Typography>
//           <Typography>Contact: {selectedItem?.contact}</Typography>
//           <Typography>Email: {selectedItem?.email}</Typography>
//           <Typography>Status: {selectedItem?.status}</Typography>
//           <Typography>
//             Blocked: {selectedItem?.blocked ? "True" : "False"}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setViewDialogOpen(false)} variant="contained">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AdminTable;

import React, { useState } from "react";
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
import {
  Edit,
  Delete,
  Add,
  Search,
  Person,
  Home,
  AdminPanelSettings,
  Visibility,
} from "@mui/icons-material";

import { SelectChangeEvent } from "@mui/material";

// Define types for the data structure
interface Tenant {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: string;
  blocked: boolean;
}

interface Owner {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: string;
  blocked: boolean;
}

interface Admin {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: string;
  blocked: boolean;
}

interface Data {
  tenants: Tenant[];
  owners: Owner[];
  admins: Admin[];
}

const dummyData = {
  tenants: [
    {
      id: "T001",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T002",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T003",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T004",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T005",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T006",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T007",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T008",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T009",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0010",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0011",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T0012",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0013",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0014",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T0015",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T00112",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0021",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T0031",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0041",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0051",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T0061",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0071",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T0081",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T0091",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T00101",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T00111",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T00121",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T00131",
      name: "John Smith",
      contact: "+1 234-567-8901",
      email: "john.smith@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "T00141",
      name: "Alice Brown",
      contact: "+1 345-678-9012",
      email: "alice.brown@email.com",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "T00151",
      name: "Bob Johnson",
      contact: "+1 456-789-0123",
      email: "bob.j@email.com",
      status: "Active",
      blocked: false,
    },

    // Add more dummy data as needed
  ],
  owners: [
    {
      id: "O001",
      name: "Robert Johnson",
      contact: "+1 987-654-3210",
      email: "robert@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "O002",
      name: "Emma Williams",
      contact: "+1 876-543-2109",
      email: "emma@email.com",
      status: "Inactive",
      blocked: true,
    },
  ],
  admins: [
    {
      id: "A001",
      name: "David Miller",
      contact: "+1 765-432-1098",
      email: "david@email.com",
      status: "Active",
      blocked: false,
    },
    {
      id: "A002",
      name: "Sophia Wilson",
      contact: "+1 654-321-0987",
      email: "sophia@email.com",
      status: "Inactive",
      blocked: true,
    },
  ],
};

const AdminTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tenants" | "owners" | "admins">(
    "tenants"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    Tenant | Owner | Admin | null
  >(null);
  const [data, setData] = useState<Data>(dummyData);

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: "tenants" | "owners" | "admins"
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

  const filteredData = data[activeTab].filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.includes(searchQuery)
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEditClick = (item: Tenant | Owner | Admin) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleViewClick = (item: Tenant | Owner | Admin) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  const handleEditSave = () => {
    const updatedData: Data = {
      ...data,
      [activeTab]: data[activeTab].map((item) =>
        item.id === selectedItem?.id ? selectedItem : item
      ),
    };
    setData(updatedData);
    setEditDialogOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        bgcolor: "#f5f5f5",
        height: "calc(100rem - 36rem)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ bgcolor: "#1976d2" }}
        >
          Add New
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab icon={<Person />} label="Tenants" value="tenants" />
        <Tab icon={<Home />} label="Owners" value="owners" />
        <Tab icon={<AdminPanelSettings />} label="Admins" value="admins" />
      </Tabs>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search by name, email, or contact..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: "grey.500" }} />,
        }}
        sx={{ mb: 2, bgcolor: "white" }}
      />

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Contact
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Blocked
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      bgcolor: row.status === "Active" ? "green" : "red",
                      color: "white",
                    }}
                  >
                    {row.status}
                  </Button>
                </TableCell>
                <TableCell>{row.blocked ? "True" : "False"}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleViewClick(row)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <FormControl size="small">
            <InputLabel>Rows per page</InputLabel>
            <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit {selectedItem?.name}</DialogTitle>
        <DialogContent>
          {/* <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Blocked</InputLabel>
            <Select
              value={selectedItem?.blocked ? "true" : "false"}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  blocked: e.target.value === "true",
                })
              }
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl> */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Blocked</InputLabel>
            <Select
              value={selectedItem?.blocked ? "true" : "false"}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem!,
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
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
        <DialogTitle>View {selectedItem?.name}</DialogTitle>
        <DialogContent>
          <Typography>ID: {selectedItem?.id}</Typography>
          <Typography>Name: {selectedItem?.name}</Typography>
          <Typography>Contact: {selectedItem?.contact}</Typography>
          <Typography>Email: {selectedItem?.email}</Typography>
          <Typography>Status: {selectedItem?.status}</Typography>
          <Typography>
            Blocked: {selectedItem?.blocked ? "True" : "False"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminTable;
