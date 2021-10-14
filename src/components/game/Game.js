import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const Game = () => {
  const [quiz, setQuiz] = useState([]);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(false);
  const [playing, setPlaying] = useState(false);

  const getQuiz = async () => {
    const result = await axios({
      method: "GET",
      url: `https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple`,
    });

    const quizObj = result.data.results.map((item, i) => {
      return {
        id: i,
        question: decode(item.question),
        correct: decode(item.correct_answer),
        answers: formatAnswers(item.incorrect_answers, item.correct_answer),
      };
    });

    setQuiz(quizObj);
  };

  const decode = (str) => {
    str = str.replace(/&quot;|&#34;|&ldquo;|&rdquo;/g, `"`);
    str = str.replace(/&#039;|&#39;|&lsquo;|&rsquo;/g, `'`);
    return str.replace(/&#(\d+);/g, String.fromCharCode(str));
  };

  const formatAnswers = (incorrect, correct) => {
    const idx = Math.floor(Math.random() * 4);

    let answers = incorrect.map((q) => decode(q));
    answers.splice(idx, 0, decode(correct));
    return answers;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = choices.reduce((acc, val, i) => {
      if (val === quiz[i].correct) {
        acc++;
      }
      return acc;
    }, 0);

    setScore(total);
    setModal(true);
  };

  const handleSelection = (e) => {
    const tmp = [...choices];
    tmp[e.currentTarget.name] = e.currentTarget.value;
    setChoices(tmp);
  };

  const handleStartButton = (e) => {
    e.preventDefault();
    getQuiz();
    setPlaying(true);
  };

  const handleReplayButton = (e) => {
    e.preventDefault();
    setModal(false);
    getQuiz();
    setChoices([]);
    setScore(0);
    document.getElementById("quiz").reset();
  };

  const handleQuitButton = (e) => {
    e.preventDefault();
    setModal(false);
    setQuiz([]);
    setChoices([]);
    setScore(0);
    setPlaying(false);
  };

  return (
    <>
      {!playing ? (
        <Card>
          <Card.Header as="h3">Trivia 101</Card.Header>
          <Card.Body>
            <Button type="button" onClick={handleStartButton}>
              Start Game
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Form id="quiz" onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            {quiz.map((item, i) => (
              <Form.Group key={i} style={{ marginBottom: "20px"}}>
                <Form.Label><strong>{item.question}</strong></Form.Label>
                <Form.Group>
                  {item.answers.map((ans, j) => (
                    <Form.Check
                      key={j}
                      type="radio"
                      name={i}
                      value={ans}
                      label={ans}
                      onChange={handleSelection}
                      required
                    />
                  ))}
                </Form.Group>
              </Form.Group>
            ))}
            <Button type="submit">Submit</Button>
          </Form>
          <Modal show={modal}>
            <p>You scored a {score}/10. Would you like to play again?</p>
            <Button type="button" onClick={handleReplayButton}>
              Replay
            </Button>
            <Button type="button" onClick={handleQuitButton}>
              Quit Game
            </Button>
          </Modal>
        </>
      )}
    </>
  );
};

export default Game;
