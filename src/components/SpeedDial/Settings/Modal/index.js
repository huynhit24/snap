import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import React from 'react';
import ThemeSetting from '../Theme';
import useStyle from './style';
import DialogTitle from "@material-ui/core/DialogTitle";

function SettingModal({ open, onClose }) {
  const classes = useStyle();

  return (
    <Dialog
      classes={{
        paper: classes.rootPaper,
      }}
      onClose={onClose}
      aria-labelledby="setting dialog"
      disableBackdropClick={true}
      maxWidth="xs"
      open={open}>
      <DialogTitle>
          {"Đổi màu nền"}
      </DialogTitle>

      <DialogContent classes={{ root: classes.content }}>
        <ThemeSetting />
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button
          className="_btn _btn-primary"
          onClick={onClose}
          color="primary"
          size="small"
          variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SettingModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

SettingModal.defaultProps = {
  onClose: function () {},
  open: false,
};

export default SettingModal;