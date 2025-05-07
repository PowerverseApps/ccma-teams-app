import { TrendingUp } from 'lucide-react';
import React from "react";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

export default function SectionCards() {
  return (
    <div className="flex gap-4 px-4 lg:px-6">
        <Card >
            <CardHeader className="relative">
                <CardDescription>Total Meetings</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  890
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUp className="size-3" />
                        +27%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                     <TrendingUp className="size-4" /> 27% increase published meetings
                </div>
                <div className="text-muted-foreground">
                </div>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader className="relative">
                <CardDescription>Total Meetings</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  890
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUp className="size-3" />
                        +27%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                     <TrendingUp className="size-4" /> 27% increase published meetings
                </div>
                <div className="text-muted-foreground">
                </div>
            </CardFooter>
        </Card><Card>
            <CardHeader className="relative">
                <CardDescription>Total Meetings</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  890
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUp className="size-3" />
                        +27%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                     <TrendingUp className="size-4" /> 27% increase published meetings
                </div>
                <div className="text-muted-foreground">
                </div>
            </CardFooter>
        </Card>
    
</div>
  )
}