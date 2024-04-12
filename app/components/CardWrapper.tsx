"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardWrapperProps {
  label: string
  title: string
  backButtonHref: string
  backButtonLabel: string
  children: React.ReactNode
}



const CardWrapper = ({ label, title, backButtonHref, backButtonLabel, children }: CardWrapperProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        {/* <AuthHeader label={label} title={title} /> */}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {/* <BackButton label={backButtonLabel} href={backButtonHref} /> */}
      </CardFooter>
    </Card>
  )
}

export default CardWrapper