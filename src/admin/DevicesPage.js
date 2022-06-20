import React, { useState } from 'react';
import {
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody, makeStyles, IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';
import { formatBoolean } from '../common/formatter';
import OptionsLayout from '../settings/OptionsLayout';
import { useTranslation } from '../LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));

const DevicesView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();
  const t = useTranslation();

  const [items, setItems] = useState([]);

  useEffectAsync(async () => {
    const response = await fetch('/api/devices');
    if (response.ok) {
      setItems(await response.json());
    }
  }, [updateTimestamp]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.columnAction} />
            <TableCell>CAR Name</TableCell>
            <TableCell>GPS ID</TableCell>
            <TableCell>ICCID</TableCell>
            <TableCell>VIN</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Odometer</TableCell>
            <TableCell>{t('sharedDisabled')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className={classes.columnAction} padding="none">
                <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.uniqueId}</TableCell>
              <TableCell>{item.iccid}</TableCell>
              <TableCell>{item.vin}</TableCell>
              <TableCell>{item.make}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{Number(item.odometer).toFixed(0)}</TableCell>
              <TableCell>{formatBoolean(item.disabled, t)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DevicesPage = () => (
  <OptionsLayout>
    <EditCollectionView content={DevicesView} editPath="/device" endpoint="devices" />
  </OptionsLayout>
);

export default DevicesPage;
