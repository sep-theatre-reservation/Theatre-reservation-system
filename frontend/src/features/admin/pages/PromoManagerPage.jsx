import { Container, Stack, Col, Row } from 'react-bootstrap'
import AddPromoComponent from '../components/Promotion/AddPromoComponent'
import ShowPromoComponent from '../components/Promotion/ShowPromoComponent'
import { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';

function PromoManagerPage() {
  const [updateShowPromotions,setUpdateShowPromotions]=useState(false)
  const [promotionList, setPromotionList] = useState([]);
  const { isLoading: isAddPromoLoading, sendRequest: sendAddPromoRequest } = useHttpClient()
  const { isLoading: isShowPromoLoading, sendRequest: sendShowPromoRequest } = useHttpClient();
  const { isLoading: isDeletePromoLoading, error, sendRequest: sendDeletePromoRequest, clearError } = useHttpClient();
  useEffect(()=>{getPromotions()},[ updateShowPromotions,sendShowPromoRequest])

  const getPromotions = async () => {
    try {
      const responseData = await sendShowPromoRequest(
        "http://localhost:3000/api/promotions"
      );
      setPromotionList(responseData.promotions);
    } catch (err) {
    }
    console.log(promotionList)
  }

  const addPromotion = async (formData) => {
    try {
      const responseData = await sendAddPromoRequest(
        "http://localhost:3000/api/promotions",
        "POST",
        JSON.stringify({
          promotionTitle:formData.title,
          description:formData.description,
          imageUrl:formData.imageUrl

        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      setUpdateShowPromotions((prevValue)=>!prevValue)
    } catch (err) {
    }
  }

  const deletePromotion = async (deletedPromotionId) => {
    setPromotionList((prevPromotions) =>
      prevPromotions.filter((promotion) => promotion.id != deletedPromotionId)
    );

    try {
      await sendDeletePromoRequest(
        `http://localhost:3000/api/promotions/${deletedPromotionId}`,
        "DELETE"
      );
    } catch (err) {
    }
  };
  return (
    <Container className='pt-5  '>
      <Row >
        <Col lg={6}>
          <AddPromoComponent onAddPromotion={addPromotion} isLoading={isAddPromoLoading} />
        </Col>
        <Col lg={6}>
          <ShowPromoComponent promotionList={promotionList} onDeletePromotion={deletePromotion} isDeletePromoLoading={isDeletePromoLoading} isShowPromoLoading={isShowPromoLoading} />
        </Col>
      </Row>
    </Container>
  )
}

export default PromoManagerPage