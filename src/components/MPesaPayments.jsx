import axios from "axios"
import { useState } from "react"
import React from "react"
import { useLocation } from "react-router-dom"

const MpesaPayement = () => {
    //hook to find URL
    const { product } = useLocation().state || {}
    //hooks
    const img_url = "https://brianswala.alwaysdata.net/static/images/"
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState('')
    //function to handle submit
    const submit = async (e) => {
        e.preventDefault()
        setLoading("please wait...")
        try {
            //form data
            const data = new FormData()
            // get the customer phonenumber
            data.append('phone', phone)
            data.append('amount', product.product_cost)
            //post data to the backend api
            const response = await axios.post('http://brianswala.alwaysdata.net/api/mpesa_payment', data)
            setLoading(response.data.message)

            
        } catch (error) {
            setLoading(error.message)
        }
    }

    return (
        <div className="row">
            <div className="container col-md-6 card p-3 ">
                <div className="mx-auto">
                    <h5 className="text_center text-success"> LIPA NA MPESA</h5>
                    <img src={img_url + product.product_photo} alt="product" className="img-fluid mb-2" />
                    <p className="mb-1"><strong>product:</strong>{product.product_name}</p>
                    <p className="mb-2"><strong>Price:</strong>{product.product_cost}</p>
                    <form onSubmit={submit} className="text center">
                        <input type="text"
                            placeholder="Enter your phone number"
                            className="form-control mb-2"
                            value={phone}
                            required
                            onChange={(e) => setPhone(e.target.value)} />
                        <br />
                        {phone}
                        <button type="submit" className="btn btn-success">Pay Now</button>
                    </form>
                    <p className="text-center">{loading}</p>
                </div>
            </div>
        </div>
    )
}

export default MpesaPayement