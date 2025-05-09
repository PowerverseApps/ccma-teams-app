import { TrendingUp } from 'lucide-react';
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
        <Card>
            <CardHeader className="relative">
                <CardDescription>Total Meetings</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  1,245
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUp className="size-3" />
                        +15%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                     <TrendingUp className="size-4" /> 15% increase in total meetings
                </div>
                <div className="text-muted-foreground">
                    Compared to last month
                </div>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader className="relative">
                <CardDescription>Active Users</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  3,678
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUp className="size-3" />
                        +8%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                     <TrendingUp className="size-4" /> 8% increase in active users
                </div>
                <div className="text-muted-foreground">
                    Compared to last week
                </div>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader className="relative">
                <CardDescription>Completed Tasks</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  512
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUp className="size-3" />
                        +22%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                     <TrendingUp className="size-4" /> 22% increase in completed tasks
                </div>
                <div className="text-muted-foreground">
                    Compared to last quarter
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}