import React from "react";
import { useNavigate } from "react-router-dom";



export const LandingPage = () => {
    const navigate = useNavigate();
   
   
    return (
        <div className="container mt-5 text-center w-100 h-100 landing-page">
            <div className="landing-gradient"></div>
            <img src="https://res.cloudinary.com/didd1mjsp/image/upload/v1723976999/Untitled-5_vybrtx.png"></img>
            <p className="landing-description">Experience the taste of Italy right in your neighborhood! At <strong>Pizzalicious</strong>, we craft every pizza with passion, using the freshest ingredients and time-honored recipes. Whether you're craving a classic Margherita, a savory Pepperoni, or something uniquely your own, our menu offers a slice for everyone. Join us for a cozy dine-in experience, or enjoy our delicious pizzas from the comfort of your home with fast delivery.
                Taste the difference—one bite at a time!</p>
            <button className="btn btn-beige" onClick={() => navigate("/home")}>Enter</button>
            <img src="https://flawless.life/wp-content/uploads/2020/02/Le_migliori_Pizzerie_di_Milano_Cover.jpg" className="landing-image"></img>
        </div>
    
    );
};
