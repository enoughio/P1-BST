import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InformationCard = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span className="text-muted-foreground">{`${user.name}, ${user.lastName}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span className="text-muted-foreground">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Tel:</span>
          <span className="text-muted-foreground">{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Plan:</span>
          <span className="text-muted-foreground">{user.plan}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationCard;

