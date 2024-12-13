import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiEdit2Line } from "react-icons/ri";

const UserDetailsScreen = () => {
  return (
    <div>
      <Card>
        <CardHeader >
          <div className="flex flex-row">
          <div className="flex sm:flex-col md:flex-row sm:w-full md:1/2 items-center gap-5">
            <Avatar className="w-36 h-36">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle className="gap-2">
                <p className="text-gray-500 font-medium text-md">Joseph Kingali</p>
                <p className="text-gray-400 font-medium text-sm">joseph@kigali.com</p>
                <p className="text-gray-400 font-medium text-sm">Branch Admin</p>
            </CardTitle>
          </div>
          <div className="sm:w-full md:1/2 flex justify-end items-center">
            <Button className="justify-between px-5 w-24 border-primary text-primary" variant={'outline'}>
              Edit <RiEdit2Line />
            </Button>
          </div>
          
          </div>
          <div className="text-sm text-gray-500 md:w-full lg:w-2/3">
                In this project, you will demonstrate your mastery of the following competencies: • Utilize qualitative and quantitative information to make decisions that strengthen communication projects • Apply metrics and feedback from social media platforms to create and adapt communications • Explain how fundamental internet marketing strategy concepts inform the creation of various communications Scenario Imagine you work in the Communications department at Southern New Hampshire University as a social media specialist.
                </div>
        </CardHeader>
        
        <CardContent>
            <div>
                <CardTitle className="text-lg">
                    Personal Information
                </CardTitle>
                <div className="py-4 flex flex-wrap">
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>Name</p>
                      <p className="text-gray-500">John Doe</p>
                    </div>
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>Email</p>
                      <p className="text-gray-500 underline">Johndoe@test.com</p>
                    </div>
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>Phone</p>
                      <p className="text-gray-500">+254769274749</p>
                    </div>
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>Role</p>
                      <p className="text-gray-500">Branch Admin</p>
                    </div>
                </div>
            </div>
            <div>
                <CardTitle className="text-lg">
                    Address Information
                </CardTitle>
                <div className="py-4 flex flex-wrap">
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>Country</p>
                      <p className="text-gray-500">Kenya</p>
                    </div>
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>City</p>
                      <p className="text-gray-500">Nairobi</p>
                    </div>
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>County/Province</p>
                      <p className="text-gray-500">Nairobi</p>
                    </div>
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>Street Address</p>
                      <p className="text-gray-500">123 Main Street</p>
                    </div>
                    <div className="sm:w-full md:w-1/2 lg:w-1/3 pb-2">
                      <p>Street Address</p>
                      <p className="text-gray-500">123 Main Street</p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsScreen;
