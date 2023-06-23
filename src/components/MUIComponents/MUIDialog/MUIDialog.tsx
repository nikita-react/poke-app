import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import { SimpleDialogProps, SortKey } from "../../../types";

const MUIDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open, setSortKey, data } = props;

  const handleClose = () => onClose(selectedValue as SortKey);

  const handleListItemClick = (value: SortKey) => {
    onClose(value);
    setSortKey(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        {data.map(({ key, name }) => (
          <ListItem disableGutters key={key}>
            <ListItemButton onClick={() => handleListItemClick(key as SortKey)}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default MUIDialog;
