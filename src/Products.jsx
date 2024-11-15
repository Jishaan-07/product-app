import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg from './assets/bg.png';
import { Button, Modal } from 'react-bootstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [newProduct, setNewProduct] = useState({ name: '', brand: '', price: '', image: '' });

  const apiUrl = 'https://product-cart-server.onrender.com/products';

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  
  

  const fetchProducts = async () => {
    const response = await axios.get(apiUrl);
    setProducts(response.data);
    
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

 // Create a new product
const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log(handleSubmit);
  
  if (!newProduct.name || !newProduct.brand || !newProduct.price || !newProduct.image) {
    alert('Please enter product details.');
    return;
  }

 
  try {
    await axios.post(apiUrl, newProduct);
    setNewProduct({ name: '', brand: '', price: '', image: '' });
    fetchProducts();
    alert('Product added successfully!');
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Failed to add product.');
  }
};

  // Delete a product
  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchProducts();
  };

  // Open the edit modal
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShow(true);
  };

  // Update the product
  const handleUpdate = async () => {
    await axios.put(`${apiUrl}/${currentProduct.id}`, currentProduct);
    setShow(false);
    fetchProducts();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '200vh',
        width: '100%',
      }}
      className="text-dark"
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Product Cart</h1>
        <div className="border bg-light rounded mt-1 p-4">
          <form >
            <input
              className="form-control mb-3"
              name="name"
              placeholder="Enter Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <input
              className="form-control mb-3"
              name="brand"
              placeholder="Enter Product Brand"
              value={newProduct.brand}
              onChange={handleInputChange}
            />
            <input
              className="form-control mb-3"
              name="price"
              placeholder="Enter Product Price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <input
              className="form-control mb-3"
              name="image"
              placeholder="Add Product Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
            />
            <div className="d-flex justify-content-center">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
          </form>
        </div>

        <div className="mt-5">
  <table className="table table-bordered table-hover text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', overflow: 'hidden' }}>
    <thead style={{ backgroundColor: '#343a40', color: '#fff', borderRadius: '10px 10px 0 0' }}>
      <tr>
        <th style={{ padding: '15px', fontSize: '18px' }}>P-ID</th>
        <th style={{ padding: '15px', fontSize: '18px' }}>P-Name</th>
        <th style={{ padding: '15px', fontSize: '18px' }}>P-Brand</th>
        <th style={{ padding: '15px', fontSize: '18px' }}>P-Price</th>
        <th style={{ padding: '15px', fontSize: '18px' }}>P-Image</th>
        <th style={{ padding: '15px', fontSize: '18px' }}>Action</th>
      </tr>
    </thead>
    <tbody style={{ fontSize: '16px' }}>
      {products.map((product) => (
        <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '15px' }}>{product.id}</td>
          <td style={{ padding: '15px' }}>{product.name}</td>
          <td style={{ padding: '15px' }}>{product.brand}</td>
          <td style={{ padding: '15px', color: '#28a745', fontWeight: 'bold' }}>${product.price}</td>
          <td style={{ padding: '15px' }}>
            <img
              width="80px"
              height="80px"
              style={{ borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
              src={product.image}
              alt={product.name}
            />
          </td>
          <td style={{ padding: '15px' }}>
            <Button variant="success" onClick={() => handleEdit(product)} style={{ marginRight: '10px' }}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {/* Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Enter Product Name"
            value={currentProduct.name}
            onChange={handleEditChange}
          />
          <input
            className="form-control mb-3"
            name="brand"
            placeholder="Enter Product Brand"
            value={currentProduct.brand}
            onChange={handleEditChange}
          />
          <input
            className="form-control mb-3"
            name="price"
            placeholder="Enter Product Price"
            value={currentProduct.price}
            onChange={handleEditChange}
          />
          <input
            className="form-control mb-3"
            name="image"
            placeholder="Add Product Image URL"
            value={currentProduct.image}
            onChange={handleEditChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
