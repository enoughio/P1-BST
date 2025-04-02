import React, { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


// TODO: ADD Skelatopn 

const page = () => {
  const history = [
    {
      clubId: "INV001",
      clubName: "Bharat Storytellers",
      join: "1-1-2021",
      end: "6-1-2021",
    },
    {
      clubId: "INV001",
      clubName: "Bharat Storytellers",
      join: "1-1-2021",
      end: "6-1-2021",
    },
    {
      clubId: "INV001",
      clubName: "Bharat Storytellers",
      join: "1-1-2021",
      end: "6-1-2021",
    },
    {
      clubId: "INV001",
      clubName: "Bharat Storytellers",
      join: "1-1-2021",
      end: "6-1-2021",
    },
    {
      clubId: "IND002",
      clubName: "Swami vivekanand ",
      join: "6-2-2021",
      end: "12-2-2021",
    },
    {
      clubId: "IND002",
      clubName: "Swami vivekanand ",
      join: "6-2-2021",
      end: "12-2-2021",
    },
  ];

  return (
    <div>
      <Table className="mt-10 border w-[95%] mx-auto "> 
        <TableCaption>A list of your Membership History.</TableCaption>
        <TableHeader >
          <TableRow>
            <TableHead className="w-[50px]">S. No</TableHead>
            <TableHead className="w-[100px]">ClubId</TableHead>
            <TableHead>Club Name</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">End Date</TableHead>
          </TableRow>
        </TableHeader>

        <Suspense  >
        <TableBody>
          {history.map((dets, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index+1}</TableCell>
                <TableCell className="font-medium">{dets.clubId}</TableCell>
                <TableCell>{dets.clubName}</TableCell>
                <TableCell>{dets.join}</TableCell>
                <TableCell className="text-right">{dets.end}</TableCell>
              </TableRow>
            );
        })}
        </TableBody>
        </Suspense>
      </Table>
    </div>
  );
};

export default page;
