import { Container, Stack, Col, Row } from 'react-bootstrap'
import AddPromoComponent from '../components/Promotion/AddPromoComponent'
import ShowPromoComponent from '../components/Promotion/ShowPromoComponent'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/ErrorModal';

function PromoManagerPage() {
  const auth =useContext(AuthContext)
  const [updateShowPromotions, setUpdateShowPromotions] = useState(false)
  const [promotionList, setPromotionList] = useState([]);
  const { isLoading: isAddPromoLoading, sendRequest: sendAddPromoRequest, error:addError, clearError:clearAddError  } = useHttpClient()
  const { isLoading: isShowPromoLoading, sendRequest: sendShowPromoRequest, error:showError, clearError:clearShowError } = useHttpClient();
  const { isLoading: isDeletePromoLoading, sendRequest: sendDeletePromoRequest, error:deleteError, clearError:clearDeleteError } = useHttpClient();
  useEffect(() => { getPromotions() }, [updateShowPromotions, sendShowPromoRequest])
  
  
  const getPromotions = useCallback( async () => {
    try {
      const responseData = await sendShowPromoRequest(
        "http://localhost:3000/api/promotions"
        );
        setPromotionList(responseData.promotions);
      } catch (err) {
      }
      console.log(promotionList)
    }
  )

  const addPromotion = async (formData) => {
    try {
      const responseData = await sendAddPromoRequest(
        "http://localhost:3000/api/promotions",
        "POST",
        JSON.stringify({
          promotionTitle: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl

        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
      setUpdateShowPromotions((prevValue) => !prevValue)
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
        "DELETE",
        null,
        {Authorization: "Bearer " + auth.token}
      );
    } catch (err) {
    }
  };
  return (
    <>
    <ErrorModal error={addError} onClear={clearAddError} />
    {/* <ErrorModal error={showError} onClear={clearShowError} /> */}
    <ErrorModal error={deleteError} onClear={clearDeleteError} />
    <Container  className="py-5" style={{minHeight:"70vh"}}>
      <Row >
        <Col lg={6}>
          <AddPromoComponent onAddPromotion={addPromotion} isLoading={isAddPromoLoading} />
        </Col>
        <Col lg={6}>
          <ShowPromoComponent promotionList={promotionList} onDeletePromotion={deletePromotion} isDeletePromoLoading={isDeletePromoLoading} isShowPromoLoading={isShowPromoLoading} />
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default PromoManagerPage