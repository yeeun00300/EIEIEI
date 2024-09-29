import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import styles from "./AllscheduleModal.module.scss"; // CSS 모듈 스타일

const AllshceduleModal = ({ isOpen, onRequestClose, schedules }) => {
  return (
    <Dialog open={isOpen} onClose={onRequestClose} fullWidth maxWidth="md">
      <DialogTitle className={styles.dialogTitle}>모든 일정</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <List className={styles.modalScheduleList}>
          {schedules.map((schedule, scheduleIndex) =>
            schedule.content.map((contentItem, contentIndex) => (
              <ListItem
                key={`${scheduleIndex}-${contentIndex}`}
                className={styles.modalScheduleItem}
              >
                <ListItemAvatar>
                  <Avatar>{contentItem.title.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span">
                      {contentItem.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        {contentItem.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {contentItem.createdAt.split("T")[0]}
                      </Typography>
                    </>
                  }
                />
                <Divider />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onRequestClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AllshceduleModal;
