'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Users, Handshake, Share2 } from 'lucide-react';
import { GooglePayButton } from '@google-pay/button-react';

export default function GetInvolvedPage() {
  const [donationAmount, setDonationAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    message: '',
  });

  const suggestedAmounts = [1000, 5000, 10000, 25000];

  function handleDonation(amount: number) {
    // Google Pay integration will be handled here
    console.log('Donation amount:', amount);
  }

  async function handleVolunteerSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Handle volunteer form submission
    console.log('Volunteer form:', volunteerForm);
  }

  return (
    <div className="py-16 bg-neutral-cream min-h-screen">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Join Us in Making a Difference
          </h1>
          <p className="text-lg text-foreground/70">
            There are many ways to support our mission and create lasting impact
          </p>
        </div>

        {/* Donate Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Heart className="h-6 w-6 text-secondary" />
                <CardTitle className="text-2xl">Donate</CardTitle>
              </div>
              <CardDescription className="text-base">
                Your contribution directly supports rural communities in Sri Lanka
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground/80">
                Every donation helps us continue our work in sustainable agriculture, 
                women's empowerment, and rural economic development.
              </p>

              <div>
                <Label className="mb-2 block">Suggested Amounts (LKR)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount ? 'default' : 'outline'}
                      onClick={() => {
                        setDonationAmount(amount);
                        setCustomAmount('');
                      }}
                      className="h-16"
                    >
                      {amount.toLocaleString()} LKR
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Label htmlFor="custom-amount">Custom Amount (LKR)</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) {
                        setDonationAmount(Number(e.target.value));
                      }
                    }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-foreground/60 mb-4">
                  Tax receipts will be provided for all donations
                </p>
                <div className="flex justify-center">
                  <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [{
                        type: 'CARD',
                        parameters: {
                          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                          allowedCardNetworks: ['VISA', 'MASTERCARD'],
                        },
                        tokenizationSpecification: {
                          type: 'PAYMENT_GATEWAY',
                          parameters: {
                            gateway: 'example',
                            gatewayMerchantId: 'exampleGatewayMerchantId',
                          },
                        },
                      }],
                      merchantInfo: {
                        merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID || '12345678901234567890',
                        merchantName: "WE'RE SL",
                      },
                      transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: (donationAmount / 100).toFixed(2),
                        currencyCode: 'LKR',
                        countryCode: 'LK',
                      },
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                      console.log('Payment successful:', paymentRequest);
                      // Handle successful payment
                    }}
                    onError={(error) => {
                      console.error('Payment error:', error);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Volunteer Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Volunteer</CardTitle>
              </div>
              <CardDescription className="text-base">
                Share your skills and time to make a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="vol-name">Name *</Label>
                  <Input
                    id="vol-name"
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vol-email">Email *</Label>
                  <Input
                    id="vol-email"
                    type="email"
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vol-phone">Phone</Label>
                  <Input
                    id="vol-phone"
                    type="tel"
                    value={volunteerForm.phone}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="vol-skills">Skills & Interests</Label>
                  <Textarea
                    id="vol-skills"
                    rows={3}
                    value={volunteerForm.skills}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                    placeholder="Tell us about your skills and how you'd like to help"
                  />
                </div>
                <div>
                  <Label htmlFor="vol-message">Message</Label>
                  <Textarea
                    id="vol-message"
                    rows={4}
                    value={volunteerForm.message}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Partner Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Handshake className="h-6 w-6 text-accent" />
                <CardTitle className="text-2xl">Partner With Us</CardTitle>
              </div>
              <CardDescription className="text-base">
                Corporate partnerships and NGO collaborations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 mb-6">
                We welcome partnerships with organizations that share our vision. 
                Whether you're a corporation looking to make a social impact or an 
                NGO seeking collaboration, we'd love to hear from you.
              </p>
              <Button asChild>
                <a href="/contact">Contact Us About Partnerships</a>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Spread the Word Section */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Share2 className="h-6 w-6 text-primary-light" />
                <CardTitle className="text-2xl">Spread the Word</CardTitle>
              </div>
              <CardDescription className="text-base">
                Help us reach more people
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 mb-4">
                Follow us on social media and share our stories with your network.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline">Facebook</Button>
                <Button variant="outline">Instagram</Button>
                <Button variant="outline">Twitter</Button>
                <Button variant="outline">LinkedIn</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

