import React, { useRef, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  Avatar,
} from '@material-ui/core';
// import { Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
// import { signInWithGoogle } from '../firebase';
import { auth, googleProvider, githubProvider } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        history.push('/');
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
        setError('Failed to log in');
      });
  };

  const signInWithGithub = () => {
    auth
      .signInWithPopup(githubProvider)
      .then((res) => {
        history.push('/');
        console.log(res.user);
      })
      // .catch((error) => {
      //   console.log(error.message);
      //   setError('Failed to log in');
      // })
      .catch(alert);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  const paperStyle = {
    padding: 30,
    height: '60vh',
    width: 400,
    margin: '40px auto',
  };

  const avatarStyle = {
    backgroundColor: '#154c79',
  };

  // const signInWithGoogle = () => {
  //   auth
  //     .signInWithPopup(googleProvider)
  //     .then((res) => {
  //       console.log(res.user);
  //       history.push('/');
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       if (error.code === 'auth/account-exists-with-different-credential') {
  //         setError('Account already existed in other platform.');
  //         setTimeout(() => {
  //           setError('');
  //         }, 3000);
  //       }
  //     });
  // };

  return (
    // <div>
    //   <div className="container">
    //     <h2 className="text-center mb-4">Log In</h2>
    //     {error && <Alert variant="danger">{error}</Alert>}
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group id="email">
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control type="email" ref={emailRef} required />
    //       </Form.Group>
    //       <Form.Group id="password">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control type="password" ref={passwordRef} required />
    //       </Form.Group>
    //       <Button disabled={loading} className="w-100" type="submit">
    //         Log In
    //       </Button>
    //     </Form>
    //     <div className="w-100 text-center mt-3">
    //       <Link to="/forgot-password">Forgot Password?</Link>
    //     </div>
    //     <div className="w-100 text-center mt-2">
    //       Need an account? <Link to="/signup">Sign Up</Link>
    //     </div>
    //   </div>
    // </div>

    <Grid container>
      <Paper elevation={10} style={paperStyle}>
        <Box pt={3} mt={3}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2>Sign In</h2>
          </Grid>
          {error && (
            <Typography variant="h5" align="center" color="error">
              {error}
            </Typography>
          )}
        </Box>

        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              placeholder="Enter Email"
              fullWidth
              required
              type="email"
              name="email"
              inputRef={emailRef}
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              fullWidth
              required
              type="password"
              inputRef={passwordRef}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={{ margin: '10px 0' }}
              disabled={loading}
            >
              Sign in
            </Button>
          </form>
        </div>
        <div>
          <Typography>
            <Link to="/forgot-password" color="secondary">
              Forgot password ?
            </Link>
          </Typography>
          <Typography>
            Don't have account ?
            <Link to="signup" color="secondary">
              {' '}
              Sign up
            </Link>
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            fullWidth
            style={{ margin: '10px 0' }}
            onClick={signInWithGoogle}
          >
            <span
              style={{
                fontSize: '20px',
                color: '#3f51b5',
                marginRight: '10px',
              }}
            >
              <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
            </span>
            <Typography>Sign in with google</Typography>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            fullWidth
            style={{ margin: '10px 0' }}
            onClick={signInWithGithub}
          >
            <span
              style={{
                fontSize: '20px',
                color: '#3f51b5',
                marginRight: '20px',
              }}
            >
              <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
            </span>
            <Typography>Sign in with github</Typography>
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}
