import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import LoadingOverlay from '../../../shared/components/LoadingOverlay';

function AddPromoComponent({onAddPromotion,isLoading}) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: ""
    })

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormData((prevData)=>({...prevData,[name]:value}))
    }

    const handleAddPromotion =(event)=>{
        event.preventDefault()
        onAddPromotion(formData)
        setFormData({
            title: "",
            description: "",
            imageUrl: ""
        })
    }
    return (
        <Card style={{ width: '30rem' }}>
            {isLoading && <LoadingOverlay asOverlay />}
            <Card.Body>
                <Card.Title>Add Promotion</Card.Title>
                <Form onSubmit={handleAddPromotion}>
                    <Form.Group controlId="cardName" className='mb-2'>
                        <Form.Label>Promotion Title</Form.Label>
                        <Form.Control type="text" name='title' value={formData.title} onChange={handleChange} placeholder="Enter Title" />
                    </Form.Group>
                    <Form.Group controlId="cardName" className='mb-2'>
                        <Form.Label>Promotion Description</Form.Label>
                        <Form.Control type="text" name='description' value={formData.description} onChange={handleChange} placeholder="Enter Description" />
                    </Form.Group>
                    <Form.Group controlId="cardName" className='mb-2'>
                        <Form.Label>Card Image Url</Form.Label>
                        <Form.Control type="text" name='imageUrl' value={formData.imageUrl} onChange={handleChange} placeholder="Enter Source Url" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-2 float-end me-3'>
                        Add
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddPromoComponent