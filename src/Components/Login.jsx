import React,{useState} from 'react'
import supabase from '../SupabaseClient';
import {Box,Button, Container,Typography,Avatar,TextField,} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Navbar from './Navbar';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
const navigate = useNavigate();
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [comfirmPassword, setcomfirmPassword] = useState('')
const [roomCode, setRoomCode] = useState('');   

//using supabase for authentication
const handleLogin = async () => {
    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert('Login failed: ' + error.message);
        } else {
            alert('Login successful');
            navigate('/chat');
        }
    } catch (err) {
        console.error(err);
    }

    
};

//using supabase for authentication and generating room code
const generateRoomCode = async () => {
    try {
        // Generate a random room code
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();

        // Fetch the authenticated user
        const { data: { user }, error: sessionError } = await supabase.auth.getUser();

        if (sessionError || !user) {
            throw new Error(sessionError?.message || 'User not authenticated.');
        }

        // Insert the room code into the database
        const { error: insertError } = await supabase
            .from('room_codes')
            .insert([{ code, created_by: user.id }]);

        if (insertError) {
            throw new Error(`Failed to create room code: ${insertError.message}`);
        }

        // Update the state and notify the user
        setRoomCode(code);
        alert(`Room Code Generated: ${code}`);
    } catch (err) {
        console.error('Error generating room code:', err);
        alert(err.message || 'An unexpected error occurred while generating the room code.');
    }
};



//normal code for authentication
// const handleLogin = () => {
//     if(!email.includes('@gmail.com')){
//         alert('Invalid Email')
// }else{
//     alert('Login Success')
// }

// if(password.length < 6){
//     alert('Password is too short')
// }else{
//     alert('Login Success')
// }

// if(password !== comfirmPassword){
//     alert('Password does not match')

// }else{
//     alert('Login Success')
// }
// }


  return (
    <div >
        <div>
        <Navbar />
        </div>
       

         <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Container maxWidth="xs" className="shadow-lg rounded-lg bg-white p-6">
                <Box
                    className="flex flex-col items-center"
                    sx={{ marginTop: 2 }}
                >
                    <Avatar className="bg-blue-500">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className="mt-2 text-gray-700">
                        Login in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        noValidate
                        sx={{ mt: 1 }}
                        className="w-full"
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="mb-4"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className="mb-4"
                        />
                         <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="comfirmPassword"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={comfirmPassword}
                            onChange={(e) => setcomfirmPassword(e.target.value)}
                            className="mb-4"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        {roomCode && (
                        <Typography variant="h6" sx={{ marginTop: '1rem' }}>
                            Room Code: {roomCode}
                        </Typography>
                    )}
                    <Button variant="outlined" fullWidth sx={{ marginTop: '1rem' }} onClick={generateRoomCode}>
                        Generate Room Code
                    </Button>
                    </Box>
                </Box>
                <div className="flex items-center justify-center mt-2">
                <p className="flex items-center text-gray-700">
                    Click to{" "}
                    <span className="ml-1 text-blue-500">
                    <Link to="/signup">signup</Link>
                    </span>
                </p>
                </div>

            </Container>
            
        </div>
        </div>
    
  )
}

export default Login