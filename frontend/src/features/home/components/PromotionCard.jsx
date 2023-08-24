import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PromotionCard() {
  return (
    <Row md={1} lg={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card style={{ height: '15rem' }}>
            <Card.Img variant="top" src="https://theatersollution.s3.amazonaws.com/d4f5a72a-fb7c-40fe-a3b6-dd24eefbc0a3.png" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PromotionCard;