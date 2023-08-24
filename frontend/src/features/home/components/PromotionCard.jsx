import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PromotionCard() {
  return (
    <Row md={1} lg={3} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card className="bg-dark text-white">
            <Card.Img src="https://c4.wallpaperflare.com/wallpaper/102/633/279/dark-gradient-artist-artwork-wallpaper-preview.jpg" alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className='custom-card'>20% Savings</Card.Title>
              <Card.Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, culpa!
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PromotionCard;