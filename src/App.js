import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import MainPage from './MainPage';
import MainSite from './MainSite'
import ContactSite from './ContactSite'
import RouteReportPage from './reports/RouteReportPage';
import ServerPage from './admin/ServerPage';
import UsersPage from './admin/UsersPage';
import DevicesPage from './admin/DevicesPage';
import DevicePage from './DevicePage';
import UserPage from './UserPage';
import SocketController from './SocketController';
import LinksPage from './settings/LinksPage';
import PositionPage from './PositionPage';
import EventReportPage from './reports/EventReportPage';
import ReplayPage from './reports/ReplayPage';
import CommandsPage from './reports/CommandsPage';
import TemporaryPage from './TemporaryPage';
import SharePage from './share/SharePage';

import LoginForm from './components/registration/LoginForm';
import RegisterForm from './components/registration/RegisterForm';
import ResetPasswordForm from './components/registration/ResetPasswordForm';

import theme from './theme';
import GeofencesPage from './GeofencesPage';
import GeofencePage from './GeofencePage';
import { LocalizationProvider } from './LocalizationProvider';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const initialized = useSelector((state) => !!state.session.server && !!state.session.user);

  return (
    <LocalizationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SocketController />
        <Switch>
          <Route exact path="/" component={MainSite} />
          <Route exact path="/contact" component={ContactSite} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/reset-password" component={ResetPasswordForm} />
          <Route exact path="/temporary/:shareUrl?" component={TemporaryPage} />
          <Route>
            {!initialized ? (<LinearProgress />) : (
              <Switch>
                <Route exact path="/main" component={MainPage} />
                <Route exact path="/replay" component={ReplayPage} />
                <Route exact path="/share" component={SharePage} />
                <Route exact path="/position/:id?" component={PositionPage} />
                <Route exact path="/user/:id?" component={UserPage} />
                <Route exact path="/device/:id?" component={DevicePage} />
                <Route exact path="/geofence/:id?" component={GeofencePage} />
                {/* <Route exact path="/geofences" component={GeofencesPage} /> */}
                <Route exact path="/settings/links" component={LinksPage} />
                {/* <Route exact path="/settings/notifications" component={NotificationsPage} />
                <Route exact path="/settings/notification/:id?" component={NotificationPage} />
                <Route exact path="/settings/groups" component={GroupsPage} />
                <Route exact path="/settings/group/:id?" component={GroupPage} />
                <Route exact path="/settings/drivers" component={DriversPage} />
                <Route exact path="/settings/driver/:id?" component={DriverPage} />
                <Route exact path="/settings/calendars" component={CalendarsPage} />
                <Route exact path="/settings/calendar/:id?" component={CalendarPage} />
                <Route exact path="/settings/attributes" component={ComputedAttributesPage} />
                <Route exact path="/settings/attribute/:id?" component={ComputedAttributePage} />
                <Route exact path="/settings/maintenances" component={MaintenancesPage} />
                <Route exact path="/settings/maintenance/:id?" component={MaintenancePage} /> */}
                <Route exact path="/admin/server" component={ServerPage} />
                <Route exact path="/admin/users" component={UsersPage} />
                <Route exact path="/admin/devices" component={DevicesPage} />
                <Route exact path="/reports/commands/:id?" component={CommandsPage} />
                {/* <Route exact path="/admin/statistics" component={StatisticsPage} /> */}
                <Route exact path="/reports/route" component={RouteReportPage} />
                <Route exact path="/reports/event/:id?" component={EventReportPage} />
                {/* <Route exact path="/reports/trip" component={TripReportPage} />
                <Route exact path="/reports/stop" component={StopReportPage} />
                <Route exact path="/reports/summary" component={SummaryReportPage} />
                <Route exact path="/reports/chart" component={ChartReportPage} /> */}
              </Switch>
            )}
          </Route>
        </Switch>
      </ThemeProvider>
    </LocalizationProvider>
    // </WonderPush>
  );
};

export default App;
