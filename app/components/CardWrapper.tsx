"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface props {
  label: string
  title: string
  backButtonHref: string
  backButtonLabel: string
  children: React.ReactNode
}

const CardWrapper = ({ label, title, backButtonHref, backButtonLabel, children }: props) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper