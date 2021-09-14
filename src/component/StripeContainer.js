import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51Ibk4KSGafLm2PSq84YA7Kn99WYEANFwxWuLrCJ5R4tZogmUmsfIQ9DV5oATk8MNs3b2gPN2LqrI36LqNYFuEnvf00n84GmYNG"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
