import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  makeStyles, Paper, IconButton, Grid, Button,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ReplayIcon from '@material-ui/icons/Replay';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import SignalCellular2BarIcon from '@material-ui/icons/SignalCellular2Bar';
import SignalCellular1BarIcon from '@material-ui/icons/SignalCellular1Bar';
import SignalCellular0BarIcon from '@material-ui/icons/SignalCellular0Bar';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import LinearProgress from "@material-ui/core/LinearProgress";
import { styled } from "@material-ui/styles";

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  formatPosition, getStatusColor, getBatteryStatus, formatDistance, formatSpeed, formatDate
} from '../common/formatter';
import { useAttributePreference } from '../common/preferences';
import RemoveDialog from '../RemoveDialog';
import { getPosition } from '../common/selectors';
import { useTranslation } from '../LocalizationProvider';
import { selectedGridRowsCountSelector } from '@material-ui/data-grid';
import moment from 'moment';

var user;

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '300px',
  },
  ...theme.palette.colors,
  listItemContainer: {
    maxWidth: '280px',
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  width: 150,
  borderRadius: 5,
}));

const StatusView = ({
  deviceId, onShowDetails, onShowHistory, onShareLink, onEditClick, address, onLogClick
}) => {
  const classes = useStyles();
  const t = useTranslation();

  const [removeDialogShown, setRemoveDialogShown] = useState(false);
  const device = useSelector((state) => state.devices.items[deviceId]);
  const position = useSelector(getPosition(deviceId));


  user = useSelector((state) => state.session.user);

  const distanceUnit = useAttributePreference('distanceUnit');
  const speedUnit = useAttributePreference('speedUnit');

  const handleClick = (e) => {
    e.preventDefault();
    onShowDetails(position.id);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    onEditClick(deviceId);
  };

  const handleRemove = () => {
    setRemoveDialogShown(true);
  };

  const handleRemoveResult = () => {
    setRemoveDialogShown(false);
  };

  const handleLog = (e) => {
    e.preventDefault();
    onLogClick(deviceId);
  };

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [commandsDetail, setCommandsDetail] = useState();

  const handleSendCommand = async() => {
    var url = `/api/commandsDetail/${deviceId}`;
    const response = await fetch(url);
    if (response.ok) {
      setCommandsDetail(await response.json());
    }
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


  return (
    <>
      <Paper className={classes.paper} elevation={0} square>
        <Grid container direction="column">
          <Grid item>
            <List>
              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary={device.name} />
              </ListItem>
              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary="Signal" />
                {(moment().diff(moment(device.lastPosition), "seconds") < 300) && <ListItemSecondaryAction>
                  {
                    device.signal === 0 && <SignalCellular0BarIcon /> ||
                    device.signal <= 8 && <SignalCellular1BarIcon /> ||
                    device.signal <= 16 && <SignalCellular2BarIcon /> ||
                    device.signal <= 24 && <SignalCellular3BarIcon /> ||
                    device.signal <= 31 && <SignalCellular4BarIcon />
                  }
                  {/* <span className={classes[getStatusColor(device.status)]}>{device.status}</span> */}
                </ListItemSecondaryAction>}
              </ListItem>

              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary="Last Position" />
                <ListItemSecondaryAction>
                  {formatDate(device.lastPosition)}
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary="Last Connect" />
                <ListItemSecondaryAction>
                  {formatDate(device.lastConnect)}
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem classes={{ container: classes.listItemContainer }}>
                {/* <ListItemText primary="Address" /> */}
                <ListItemSecondaryAction>
                  {address}
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary={t('positionSpeed')} />
                {(moment().diff(moment(device.lastPosition), "seconds") < 60) && <ListItemSecondaryAction>
                  {formatSpeed(position.speed, speedUnit, t)}
                </ListItemSecondaryAction> }
              </ListItem>
              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary="Odometer" />
                <ListItemSecondaryAction>
                  {formatDistance(position.attributes.distance, distanceUnit, t)}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary={t('positionDirection')} />
                <ListItemSecondaryAction>
                  {formatPosition(position.direction, 'direction', t)}
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary="Door" />
                <ListItemSecondaryAction>
                  {device.door ? "Closed" : "Open"}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem classes={{ container: classes.listItemContainer }}>
                <ListItemText primary={"Fuel " + ((device.fuel - device.minFuel) / (device.maxFuel - device.minFuel) * 100).toFixed(0) + "%"} />
                <ListItemSecondaryAction>
                  <BorderLinearProgress variant="determinate" value={(device.fuel - device.minFuel) / (device.maxFuel - device.minFuel) * 100} />
                </ListItemSecondaryAction>
              </ListItem>
              <Grid container>
                {user.id!==0 &&
                  <Grid item>
                    <Button color="secondary" onClick={onShareLink}>Share</Button>
                  </Grid>}
                  
                  <Grid item>
                    <Button color="secondary" onClick={onShowHistory}>Replay</Button>
                  </Grid>
                  <Grid item>
                    <Button color="secondary" onClick={handleSendCommand}>Control</Button>
                  </Grid>
                  <Grid item>
                    <Button color="secondary" onClick={() => {window.open(`https://www.google.com/maps/dir//${position.latitude},${position.longitude}/@${position.latitude},${position.longitude},17z`, '_blank');}}>Navigate</Button>
                  </Grid>
                  {user.id!==0 && <>
                  <Grid item>
                    <Button color="secondary" onClick={handleEditClick}>Edit</Button>
                  </Grid>
                  {user.administrator && <Grid item>
                    <Button color="secondary" onClick={handleRemove}>Delete</Button>
                  </Grid>}
                  <Grid item>
                    <Button color="secondary" onClick={handleLog}>Log</Button>
                  </Grid>
                  </>}
              </Grid>
            </List>
          </Grid>
        </Grid>
      </Paper>
      <RemoveDialog open={removeDialogShown} endpoint="devices" itemId={deviceId} onResult={handleRemoveResult} />
      <CommandSendDialog selectedValue={selectedValue} open={open} onClose={handleClose} deviceId={deviceId} commandsDetail={commandsDetail} />
    </>
  );
};


function CommandSendDialog(props) {
  const { onClose, selectedValue, open , commandsDetail} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  var commands;
  if(user.id) commands = [ 'Unlock' , 'Lock' , 'Horn' , 'Unkill' , 'Kill' , 'Overspeed' , 'Geofence' , 'Reboot' ];
  else commands = [ 'Unlock' , 'Lock' , 'Horn'];

  const [title, setTitle] = useState("");
  const [count, setCount] = useState('80');

  const handleListItemClick = async (value) => {
    // onClose(value);
    if(value === "Overspeed" || value === "Geofence" || value === "Kill" || value === "Unkill") { 
      // count = prompt(value, "input value");
      setTitle(value);
      setOpenChild(true);
      return;
    }
    const response = await fetch(`/api/command?command=${value}&deviceId=${props.deviceId}&userId=${user.id}`);
    if (response.ok) {
      console.log("Sent Command.");
    }
    onClose(selectedValue);
  };

  const [openChild, setOpenChild] = React.useState(false);

  const handleChildClose = () => {
    setOpenChild(false);
  };
  const handleChildSend = async() => {
    // var command = title;
    // if(title === "Kill/Unkill") command = "Kill";
    let url = `/api/command?command=${title}&deviceId=${props.deviceId}&userId=${user.id}`;
    if(title === "Overspeed" || title === "Geofence") url = url + `&count=${count}`;
    const response = await fetch(url);
    if (response.ok) {
      console.log("Sent Command.");
    }
    setOpenChild(false);
  };
  
  const getDetail = (command) => {
    // var tempCommand = command;
    // if(command === "Kill/Unkill") tempCommand = "Kill";
    for (var key in commandsDetail) {
      if(key === command){
        if(key === "Overspeed") return commandsDetail[key].count + "mph";
        else if(key === "Geofence") return commandsDetail[key].count + "mile";
        return formatDate(commandsDetail[key].createdAt);
      }
    }
    return false;
  }
  const getStatus = (command) => {
    // if(command === "Kill/Unkill") command = "Kill";
    return commandsDetail[command].status;
  }

  return (
    <>
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Command</DialogTitle>
      <List sx={{ pt: 0 }}>
        {commands.map((command) => (
          <ListItem button onClick={() => handleListItemClick(command)} key={command}>
            {/* <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar> */}
            <ListItemText primary={command} secondary={getDetail(command)} />
            { getDetail(command) && 
              (
                getStatus(command) === 'success' ?
              <DoneAllIcon color="secondary"/>:
              <CheckIcon color="disabled"/>
              )
            }
          </ListItem>
        ))}
      </List>
    </Dialog>

    <Dialog open={openChild} onClose={handleChildClose}>
      <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { !(title === "Kill" || title === "Unkill") ? "Please enter the value here..." : "Are you surre?" }
          </DialogContentText>
          { !(title === "Kill" || title === "Unkill") && <TextField
            autoFocus
            // margin="dense"
            id="value"
            label={title}
            // type="number"
            fullWidth
            variant="standard"
            value={count}
            onChange={(e) => {setCount(e.target.value)}}
            InputProps={{
              endAdornment: <InputAdornment position="end">{ (title === "Overspeed") ? "mph" : "Miles Radius" }</InputAdornment>,
            }}
          /> }
        </DialogContent>
      <DialogActions>
        <Button onClick={handleChildClose}>Cancel</Button>
        <Button onClick={handleChildSend}>Send</Button>
      </DialogActions>
    </Dialog>

    </>
  );
}

CommandSendDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


export default StatusView;
