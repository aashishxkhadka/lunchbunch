import { useState, useEffect } from 'react'
import { CheckCircle, TruckIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { useNavigate } from '@tanstack/react-router'

export default function ThankYouCard() {
    const navigate = useNavigate();
    const [showCard, setShowCard] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setShowCard(true), 300)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className={`bg-primary-foreground max-w-sm  overflow-hidden transition-all duration-500 ease-out ${showCard ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 rounded-full bg-green-100 p-3 text-green-600">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Thank you for your order!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className=" mb-4">
                        We've received your order and are getting it ready to ship.
                    </p>
                    <div className="flex items-center justify-center  mb-4">
                        <TruckIcon className="h-5 w-5 mr-2" />
                        <p className="text-sm">Estimated delivery: {(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => navigate({
                        to: "/",
                        replace: true
                    })} className="w-full">
                        Continue Shopping
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}