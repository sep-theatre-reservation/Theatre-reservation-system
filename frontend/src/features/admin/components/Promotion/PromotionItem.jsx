import { Button, Card, Stack } from 'react-bootstrap'
import { FaTicketAlt } from 'react-icons/fa'
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";
import { useState } from "react";

function PromotionItem({ promotion, onDeletePromotion,isLoading }) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmationModal(true);
    };
    const cancelDeletion = () => {
        setShowConfirmationModal(false);
    };

    const ConfirmDeletion = async () => {
        setShowConfirmationModal(false);
        onDeletePromotion(promotion.id)
    };

    return (
        <>
            <ConfirmationModal
                show={showConfirmationModal}
                onClose={cancelDeletion}
                onConfirm={ConfirmDeletion}
                text={'Do you want to proceed and remove this promotion? Please note that, this action cannot be reverted'}
            />
            <Stack direction='horizontal' gap={3}>
                {isLoading && <LoadingOverlay asOverlay />}
                <span className='mb-0 me-auto'><FaTicketAlt size={20} className='me-2 mb-1' />{promotion.promotionTitle}</span>
                <Button variant='warning'> Edit</Button>
                <Button variant='danger' onClick={handleDeleteClick}>Remove</Button>
            </Stack>
        </>
    )
}

export default PromotionItem