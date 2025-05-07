'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Copy } from 'lucide-react'

export default function OfferCard() {
    const [isHovered, setIsHovered] = useState(false)
    const offerCode = "FIRST10"

    const copyToClipboard = () => {
        navigator.clipboard.writeText(offerCode).then(() => {
            
        }, (err) => {
            console.error('Could not copy text: ', err)
        })
    }

    return (
        <Card
            className="w-full md:min-h-[200px] bg-gradient-to-br from-orange-500 to-orange-600 border-none transition-all duration-300 cursor-pointer overflow-hidden relative"
            style={{
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 10px 20px -5px rgba(249, 115, 22, 0.5)' : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300" 
                 style={{ opacity: isHovered ? 0.1 : 0 }} 
            />
            <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Special Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-white text-opacity-90">
                    Get 10% off on your first order! Use code:{' '}
                    <span
                        className="font-semibold text-white transition-colors duration-300"
                        style={{ color: isHovered ? '#FFF5E6' : '' }}
                    >
                        {offerCode}
                    </span>
                </p>
                <Button 
                    variant="secondary" 
                    className="bg-white text-orange-600 hover:bg-orange-50 transition-colors duration-300"
                    onClick={copyToClipboard}
                >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                </Button>
            </CardContent>
        </Card>
    )
}

