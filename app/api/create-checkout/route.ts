import Stripe from "stripe"
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
 
export async function POST(){
 
 const session = await stripe.checkout.sessions.create({
 
  payment_method_types:["card"],
 
  line_items:[
   {
    price_data:{
     currency:"usd",
     product_data:{name:"Cuddle Session"},
     unit_amount:5000
    },
    quantity:1
   }
  ],
 
  mode:"payment",
 
  success_url:"/dashboard",
  cancel_url:"/search"
 
 })
 
 return Response.json({url:session.url})
 
}
 