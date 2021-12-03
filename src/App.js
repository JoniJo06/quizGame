/** @format */

import './index.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, CircularProgress } from '@mui/material';
import QuestionCard from './Components/QuestionCard';

function App() {
	return (
		<Container className='App' maxWidth='100%'>
			<QuestionCard />
		</Container>
	);
}

export default App;
