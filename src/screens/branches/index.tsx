"use client"
import ModalTemplate from "@/components/molecules/modals/ModalTemplate"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import EditStore from "../stores/forms/EditStore"
import StoreBranchesTable from "../stores/tables/StoreBranchesTable"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const branches = [
    { branch_name: 'Main Branch', description: 'This is the main headquarters of the company.' },
    { branch_name: 'West Side Branch', description: 'Located on the west side, serving local businesses.' },
    { branch_name: 'East Side Branch', description: 'Branch located on the east side, primarily serving residential areas.' },
    { branch_name: 'Downtown Branch', description: 'Centrally located branch with high foot traffic.' },
    { branch_name: 'Suburban Branch', description: 'Branch located in the suburbs, catering to family needs.' }
  ];
const sampleBranch = {
    branch_name: 'Main Branch',
    description: `The Main Branch is the heart of our operations, strategically located in the city center to provide access to the broadest range of services we offer. This branch operates 24/7, serving both walk-in customers and handling critical backend operations for all other branches. With over 100 employees, the branch is equipped with state-of-the-art technology and facilities, including customer service zones, corporate meeting rooms, and a full-fledged technical support center. 
    It also hosts regular community engagement events, business seminars, and workshops, making it a cornerstone of our brand's presence in the region. Additionally, the Main Branch is designed to be fully eco-friendly, with solar panels, energy-efficient systems, and a waste management program aimed at minimizing the branch's carbon footprint. This branch is pivotal in driving the company's growth and innovations, always adapting to the fast-evolving needs of our customers and setting the highest standards in customer satisfaction and operational efficiency.`
  };
  

const BranchesScreen = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const onEditBranchClick =() => {}
    return(
        <div className="space-y-4 py-3">
        <Card
          className="sm:col-span-2"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-10">
              <h2 className="text-xl font-bold">{sampleBranch.branch_name}</h2>
            </div>
            <CardDescription className=" text-balance leading-relaxed">
              {sampleBranch.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={onEditBranchClick}>Edit Branch</Button>
          </CardFooter>
        </Card>
        <div>
          <ModalTemplate
            title="Edit sampleBranch"
            open={showModal}
            onOpenChange={setShowModal}
          >
            <EditStore data={sampleBranch} setShowModal={setShowModal} />
          </ModalTemplate>
        </div>
        <div className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <div>
                <h2 className="text-lg font-semibold">Store Branches</h2>
              </div>
            </CardHeader>
            <CardContent>
              <StoreBranchesTable />
            </CardContent>
          </Card>
        </div>
      </div>
    )
}

export default BranchesScreen