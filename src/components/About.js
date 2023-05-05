import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
    const a = useContext(noteContext)
    return (
        <div>
            <div className='container'>
            <h2>About us</h2>
            Every day with every millisecond of it, the prices of various gadgets online vary a great deal from
            their market price. It gets hard to keep up with each and every website that has a big sale going on.
            Our product comparison search engine is designed just to help the people in need of a
            well-reviewed and ideally priced product. Just search up the product you are looking for and our
            website will list you the products that are available at the moment. You click the product and it will
            take you to a new page with the product specifications and the list of websites that sell the product.
            The said list would be used for comparison of prices and the reviews of the seller. User can choose
            the website according to their budget.
            <br />
            <br />
            </div>
            <div className='container'>
                - <b>Purpose</b>: The purpose of this document is to show the software requirements of the
                Product Comparison Search Engine software.The functionality and scope of this
                software are described in this SRS document.<br></br>
                - <b>Scope</b>: The Product Comparison Search Engine software aims at helping the user to
                check and compare prices of the intended product from various websites. The major
                benefits of this software are -<br></br>
                <div className='ml-5'>
                <b>1.</b> It shows you the best suitable price available across all websites in a
                single user-friendly webpage. It also gives you the product
                specifications.<br></br>
                <b>2.</b>It has a wide variety of Modules.
                By just one search, you can get the best appropriate deal for the intended product.
                </div>
            </div>
        </div>
    )
}

export default About
