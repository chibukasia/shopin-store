"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import StoreBranchesTable from "../stores/tables/StoreBranchesTable"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

const BranchesScreen = () => {

  const router = useRouter()
    const onEditBranchClick =() => {
router.push('/store-branches/create-branch')
    }
    return(
        <div className="space-y-4 py-3">
        <Card
          className="sm:col-span-2"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-10">
              <h2 className="text-xl font-bold">Branches</h2>
            </div>
            <div className=" md:flex gap-3">
            <Card className="sm:w-72 md:w-60 mb-3">
                <CardHeader className="pb-2">
                <CardTitle className="text-3xl">Quickmart</CardTitle>
                  <CardTitle className="text-2xl">329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Branches
                  </div>
                </CardContent>
              </Card>
              <Card className="sm:w-72 md:w-60 mb-3">
                <CardHeader className="pb-2">
                <CardTitle className="text-3xl">Naivas</CardTitle>
                  <CardTitle className="text-2xl">329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                   Branches
                  </div>
                </CardContent>
              </Card>
              <Card className="sm:w-72 md:w-60 mb-3">
                <CardHeader className="pb-2">
                <CardTitle className="text-3xl">Quickmart</CardTitle>
                  <CardTitle className="text-2xl">329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Branches
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardHeader>
          <CardFooter>
            
          </CardFooter>
        </Card>
        <div>
          
        </div>
        <div className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <div className=" flex justify-between">
                <h2 className="text-lg font-semibold">Store Branches</h2>
                <Button onClick={onEditBranchClick}>Create Branch</Button>
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