import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {
  Grid, useMediaQuery, makeStyles, InputLabel, Select, MenuItem, FormControl, Button, TextField, Link,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sessionActions } from '../../store';
import { useLocalization, useTranslation } from '../../LocalizationProvider';
import StartPage from '../../StartPage';
import usePersistedState from '../../common/usePersistedState';

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  resetPassword: {
    cursor: 'pointer',
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const t = useTranslation();

  const { languages, language, setLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({ code: values[0], name: values[1].name }));

  const [failed, setFailed] = useState(false);

  const [email, setEmail] = usePersistedState('loginEmail', '');
  const [password, setPassword] = useState('');
  const [recaptcha, setRecaptcha] = useState('');

  const registrationEnabled = useSelector((state) => (state.session.server ? state.session.server.registration : false));
  const emailEnabled = useSelector((state) => (state.session.server ? state.session.server.emailEnabled : false));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rand = () => Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
    const session = rand();
    window.localStorage.setItem('session' , session);
    var data = { email : email , password : password , session : session};
    const response = await fetch('https://moovetrax.com/api/session', {
      method: 'POST',
      headers: {
				'Content-Type': 'application/json',
			},
      // body: new URLSearchParams(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`),
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      history.push('/');
    } else {
      setFailed(true);
      setPassword('');
    }
  };

  const handleSpecialKey = (e) => {
    if (e.keyCode === 13 && email && password && recaptcha) {
      handleSubmit(e);
    }
  };
  const onChange =  (value) => {
    // event.preventDefault();

    console.log(value);
    setRecaptcha(value);
    // const response = await fetch('/api/recaptcha', {
    //   method: 'POST',
    //   headers: {
		// 		'Content-Type': 'application/json',
		// 	},
    //   // body: new URLSearchParams(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`),
    //   body: JSON.stringify(data),
    // });
    // console.log(response);
    // if (response.ok) {
    //   const user = await response.json();
    //   dispatch(sessionActions.updateUser(user));
    //   history.push('/');
    // } else {
    //   setFailed(true);
    //   setPassword('');
    // }

  }

  return (
    <StartPage>
      <Grid container direction="column" spacing={2}>
        {useMediaQuery(theme.breakpoints.down('md'))
          && (
            <Grid item className={classes.logoContainer}>
              {/* <svg height="64" width="240">
                <use xlinkHref="./logo.svg#img" />
              </svg> */}
              <img height="85" width="240" src="./logo.png" />
            </Grid>
          )}
        <Grid item>
          <TextField
            required
            fullWidth
            error={failed}
            label={t('userEmail')}
            name="email"
            value={email}
            autoComplete="email"
            autoFocus={!email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={handleSpecialKey}
            helperText={failed && 'Invalid username or password'}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            required
            fullWidth
            error={failed}
            label={t('userPassword')}
            name="password"
            value={password}
            type="password"
            autoComplete="current-password"
            autoFocus={!!email}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={handleSpecialKey}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <ReCAPTCHA
            // sitekey = "6LcLyiIfAAAAACo511xcuJZcxKwIg1kYKFhE3nue"
            sitekey="6LeMLwcfAAAAAGZ8Vb5m6UjxUl3wTboTmmKqn4IQ"
            // 6LeMLwcfAAAAAOPKgdVdoh8mcpM7wrUiAwDS5QA7
            onChange={onChange}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleSubmit}
            onKeyUp={handleSpecialKey}
            variant="contained"
            color="secondary"
            disabled={!email || !password || !recaptcha}
            fullWidth
          >
            {t('loginLogin')}
          </Button>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Button onClick={() => history.push('/register')} /*disabled={!registrationEnabled}*/ color="secondary">
              {t('loginRegister')}
            </Button>
          </Grid>
          {/* <Grid item xs>
            <FormControl variant="filled" fullWidth>
              <InputLabel>{t('loginLanguage')}</InputLabel>
              <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {languageList.map((it) => <MenuItem key={it.code} value={it.code}>{it.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
        {/* {emailEnabled && ( */}
        {/* <Grid item container justify="flex-end">
          <Grid item>
            <Link onClick={() => history.push('/reset-password')} className={classes.resetPassword} underline="none">{t('loginReset')}</Link>
          </Grid>
        </Grid> */}
        {/* )} */}
      </Grid>
    </StartPage>
  );
};

export default LoginForm;
