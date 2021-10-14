import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    const result = await axios({
      method: "GET",
      url: "https://api.quotable.io/random",
    });
    setQuote(result.data.content);
    setAuthor(result.data.author);
  };

  return (
    <Card>
      <Card.Body>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "200px" }}
        >
          <Card.Text className="fst-italic">{quote}</Card.Text>
          <Card.Text className="text-center mt-1">- {author}</Card.Text>
        </div>
        <div className="text-center">
          <Button type="button" className="btn" onClick={getQuote}>
            New Quote
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Quote;
