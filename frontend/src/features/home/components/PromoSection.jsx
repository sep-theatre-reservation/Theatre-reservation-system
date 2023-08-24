import React from 'react'
import { Container } from 'react-bootstrap'
import PromotionCard from './PromotionCard'

function PromoSection() {
    return (
        <div>
            <Container fluid className="bg-light" style={{ padding: "100px" }}>
                <h2 className="my-5">Deals and Exclusive</h2>
                <PromotionCard />
            </Container>
        </div>
    )
}

export default PromoSection