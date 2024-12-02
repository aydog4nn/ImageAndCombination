import { Container, Form, Button } from 'react-bootstrap';

function CreateCombinatePage() {
    const handleSubmit = () => {}
    const handleFileChange = () => {}
    return (
        <div><Container>
            <h1>Upload an Image</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose an image to upload:</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
        </Container>
        </div>
    )
}
export default CreateCombinatePage;
