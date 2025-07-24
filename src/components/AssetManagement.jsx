// src/components/hr/AssetManagement.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";

const AssetManagement = () => {
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "MacBook Pro",
      type: "Laptop",
      assignedTo: "John Doe",
      status: "Assigned",
    },
    {
      id: 2,
      name: "Dell Monitor",
      type: "Monitor",
      assignedTo: "",
      status: "Available",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);

  const handleSave = () => {
    if (currentAsset?.id) {
      // Update existing
      setAssets(
        assets.map((a) => (a.id === currentAsset.id ? currentAsset : a))
      );
    } else {
      // Add new
      setAssets([
        ...assets,
        {
          ...currentAsset,
          id: Math.max(...assets.map((a) => a.id)) + 1,
        },
      ]);
    }
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setCurrentAsset({
              name: "",
              type: "",
              assignedTo: "",
              status: "Available",
            });
            setOpenDialog(true);
          }}
        >
          Add Asset
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell>{asset.assignedTo || "Unassigned"}</TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<Edit />}
                    onClick={() => {
                      setCurrentAsset(asset);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentAsset?.id ? "Edit Asset" : "Add Asset"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 400 }}>
            <TextField
              label="Asset Name"
              fullWidth
              margin="normal"
              value={currentAsset?.name || ""}
              onChange={(e) =>
                setCurrentAsset({ ...currentAsset, name: e.target.value })
              }
            />
            <TextField
              label="Type"
              fullWidth
              margin="normal"
              value={currentAsset?.type || ""}
              onChange={(e) =>
                setCurrentAsset({ ...currentAsset, type: e.target.value })
              }
            />
            <TextField
              label="Assigned To"
              fullWidth
              margin="normal"
              value={currentAsset?.assignedTo || ""}
              onChange={(e) =>
                setCurrentAsset({ ...currentAsset, assignedTo: e.target.value })
              }
            />
            <TextField
              label="Status"
              fullWidth
              margin="normal"
              value={currentAsset?.status || ""}
              onChange={(e) =>
                setCurrentAsset({ ...currentAsset, status: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssetManagement;
