import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import Loader from '../components/loader/Loader';
import background from '../assets/background.png';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <br />
      <div className="login-hero">

        <div className="login-form-area">
          <div className="login-box">
            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User ID"
                  required
                />
              </div>

             
              <div className="login-input-group">
                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '15px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    color: '#fff',
                    alignItems: 'center',
                  }}
                >
                  <input type="checkbox" name="check" id="rememberMe" />
                  <label htmlFor="rememberMe" style={{ fontWeight: 'normal', fontSize: '12px' }}>
                    Save User ID
                  </label>
                </div>
                {/* <a href="#">Forgot User ID</a> */}
              </div>

              <br />
              <button className="login-sign-in-btn" type="submit" disabled={loading}>
                {loading ? <Loader /> : 'log in'}
              </button>
              {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-Start',
                  paddingTop: '15px',
                }}
              >
                <a href="#">Forgot ID / Password?</a>
              </div> */}

            </form>

            {/* Additional Links */}
            <div className="login-links">
              <div style={{
                display: "flex",
                gap: "10px",
              }}>

                <span style={{
                  color: "#fff",
                  fontSize: "16px"
                }}>
                  {/* Need a user ID? */}
                </span>
                <a href="#" className="login-link">Forgot UserID/Password?</a>
              </div>
              <div className='login-links-bottom'>
              <a href="#" className="login-link">Security & help</a>
              <a href="#" className="login-link">Enroll</a></div>
            </div>
          <div className="login-links-open-account">
          <a href="#" id="open" class="login-link">Open an Account</a>
          </div>
          </div>
        </div>

        <div className="login-banneraera">

          <div className="login-banner-content">
                <img src={background} alt="body" />
          </div>
        </div>
      </div>

      <br />
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;