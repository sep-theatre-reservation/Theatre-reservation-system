import React from 'react'
import { Card, Stack } from 'react-bootstrap'
import PromotionItem from './PromotionItem'
import LoadingOverlay from '../../../shared/components/LoadingOverlay'

function ShowPromoComponent({ promotionList, onDeletePromotion, isDeletePromoLoading, isShowPromoLoading }) {

    return (
        <>
            {isShowPromoLoading && <LoadingOverlay asOverlay />}
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>Promotion List</Card.Title>
                    <Card.Text>
                        <Stack gap={2}>
                            {promotionList.map((promotion) => (
                                <PromotionItem key={promotion.id} isLoading={isDeletePromoLoading} promotion={promotion} onDeletePromotion={onDeletePromotion} />
                            ))}
                        </Stack>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default ShowPromoComponent