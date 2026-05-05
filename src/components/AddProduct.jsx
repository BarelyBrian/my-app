import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
    const [product_name, setproduct_name] = useState("")
    const [product_description, setproduct_description] = useState("")
    const [product_cost, setproduct_cost] = useState("")
    const [product_photo, setproduct_photo] = useState("")

    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    // to submit
    const submit = async (e) => {
        e.preventDefault()
        setLoading("Product is being added")
        try {
            // put the hooks into variables
            const data = new FormData()
            data.append('product_name', product_name)
            data.append('product_description', product_description)
            data.append('product_cost', product_cost)
            data.append('product_photo', product_photo)
            // to post the product too the backend
            const response = await axios.post("http://brianswala.alwaysdata.net/api/add_product", data)
            // set the loading to be empty
            setLoading("")
            // bring the success message
            setSuccess(response.data.message)
            setproduct_name("")
            setproduct_description("")
            setproduct_cost("")
            setproduct_photo("")
        } catch (error) {
            setLoading('')
            setError(error.messsage)
        }

        
    }

    return (

        <div className="d-flex justify-content-center row text-center">
            <div className="col-md-6 p-2 mt-4 card shadow">
                {loading}
                {success}
                {error}
                <h1>Upload Products</h1>
                <form onSubmit={submit}>
                    <input type="text" placeholder="Enter Product Name" className="form-control" required value={product_name} onChange={(e) => setproduct_name(e.target.value)} /><br /> {product_name}
                    <textarea placeholder="Describe your Product" className="form-control" required value={product_description} onChange={(e) => setproduct_description(e.target.value)}></textarea><br />{product_description}
                    <input type="number" placeholder="Enter Product Cost" className="form-control" required value={product_cost} onChange={(e) => setproduct_cost(e.target.value)} /><br /> {product_cost}
                    <input type="file" className="form-control" accept="image/*" required={product_photo} onChange={(e) => setproduct_photo(e.target.files[0])} /><br />
                    <button type="submit" className="btn btn-info">Upload Product</button>
                </form >
            </div>
        </div>
    )
}
export default AddProduct