import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import PromotionCard from './PromotionCard'
import { useHttpClient } from '../../shared/hooks/http-hook';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PromoSection() {
    const [pormotionList, setPromotionList] = useState([]);
    const { isLoading, sendRequest } = useHttpClient();

    useEffect(() => { fetchPromotions() }, [sendRequest])

    const fetchPromotions = async () => {
        try {
            const responseData = await sendRequest(
                "http://localhost:3000/api/promotions"
            )
            setPromotionList(responseData.promotions)
        } catch (error) {

        }
    }

    return (
        <div>
            <Container fluid className="bg-light pb-5" style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                <h2 className="py-5">Deals and Exclusive</h2>
                <Row md={1} lg={3} className="g-4">
                    {pormotionList.map((promotion, idx) => (
                        <Col key={idx}>
                            <PromotionCard key={promotion.id} promotion={promotion}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default PromoSection