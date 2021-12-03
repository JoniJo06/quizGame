/** @format */

import './../index.min.css';
import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const QuestionCard = () => {
	const [question, setQuestion] = useState();
	const [answers, setAnswers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [answer, setAnswer] = useState('');
	const [selectedAnswer, setSelectedAnswer] = useState();

	const handleClick = (e) => {
		const item = e.target;
		setSelectedAnswer(parseInt(item.value), 10);
		setAnswer(item.textContent);
	};

	const handleSubmit = () => {
		const banner = document.querySelector('.correctionBanner');
		if (answer === question.correctAnswer && selectedAnswer !== undefined) {
			console.log(question.correctAnswer);
			setIsLoading(true);
			banner.innerHTML = 'correct';
			banner.classList.add('correct');
			setTimeout(() => {
				banner.innerHTML = '';
				banner.classList.remove('correct');
			}, 5_000);
		} else if (answer !== question.correctAnswer && selectedAnswer !== undefined) {
			setIsLoading(true);
			setTimeout(() => {
				banner.innerHTML = '';
				banner.classList.remove('incorrect');
			}, 5_000);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (isLoading) {
				await axios
					.get('https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,movies&limit=1')
					.then((res) => setQuestion(res.data[0]))
					.catch((err) => console.error(err));
				setIsLoading(false);
			}
		};
		fetchData();
		const pushCorrectQuestion = async () => {
			if (question) {
				const rnd = Math.floor(Math.random() * 3);
				const temp = [question.incorrectAnswers[0], question.incorrectAnswers[1], question.incorrectAnswers[2]];
				temp.splice(rnd, 0, question.correctAnswer);
				setAnswers(temp);
			}
		};
		pushCorrectQuestion();
	}, [isLoading]);

	useEffect(() => {}, [question]);

	return (
		<Card className='QuestionCard'>
			<h3 className='correctionBanner'></h3>
			{!isLoading ? (
				<>
					<CardContent>
						<Typography gutterBottom variant='h5' component='div'>
							{question.category}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							{question.question}
						</Typography>
					</CardContent>
					<CardActions className='buttonContainer'>
						<div className='buttonContainerAnswers'>
							<Button value='1' disabled={selectedAnswer === 1 ? 'disabled' : ''} onClick={handleClick} fullWidth variant='contained'>
								{answers[0]}
							</Button>
							<Button value='2' disabled={selectedAnswer === 2 ? 'disabled' : ''} onClick={handleClick} fullWidth variant='contained'>
								{answers[1]}
							</Button>
							<Button value='3' disabled={selectedAnswer === 3 ? 'disabled' : ''} onClick={handleClick} fullWidth variant='contained'>
								{answers[2]}
							</Button>
							<Button value='4' disabled={selectedAnswer === 4 ? 'disabled' : ''} onClick={handleClick} fullWidth variant='contained'>
								{answers[3]}
							</Button>
						</div>

						<Button onClick={handleSubmit} color='success' fullWidth variant='contained'>
							Submit
						</Button>
					</CardActions>
				</>
			) : (
				<CircularProgress />
			)}
		</Card>
	);
};

export default QuestionCard;
