import Card from 'react-bootstrap/Card';


function PromotionCard({promotion}) {
  return (
          <Card className="bg-dark text-white">
            <Card.Img src={promotion.imageUrl} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className='custom-card'>{promotion.promotionTitle}</Card.Title>
              <Card.Text className='text-dark fw-bold lead'>
                {promotion.description}
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
  );
}

export default PromotionCard;