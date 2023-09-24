import { Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


function PromotionCard({ promotion }) {
  return (
    <Card className="bg-dark text-white h-100">
      <Card.Img src={promotion.imageUrl} alt="Card image" style={{ overflow: 'hidden', objectFit: 'cover' }} />
      <Card.ImgOverlay>
        <Stack direction='horizontal'>
          <Card.Title style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: 'auto', backgroundColor: '#bf342a', padding: '.5rem', borderRadius: '5px' }}>{promotion.promotionTitle}</Card.Title>
          <Stack style={{ marginLeft: 'auto' }}>
            <Card.Text style={{
              fontSize: '8rem', fontWeight: 'bold', marginLeft: 'auto', paddingRight: '1.7rem'}}>{promotion.description}%</Card.Text>
            <Card.Text style={{ fontSize: '2.5rem', marginLeft: 'auto', fontWeight: 'bold', position: 'absolute',bottom: 15,right: 20, }}>DISCOUNTS</Card.Text>
          </Stack>
        </Stack>
      </Card.ImgOverlay>
    </Card>
  );
}

export default PromotionCard;